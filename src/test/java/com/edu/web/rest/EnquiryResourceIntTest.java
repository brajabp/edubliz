package com.edu.web.rest;

import com.edu.EduApp;

import com.edu.domain.Enquiry;
import com.edu.repository.EnquiryRepository;
import com.edu.service.EnquiryService;
import com.edu.service.dto.EnquiryDTO;
import com.edu.service.mapper.EnquiryMapper;
import com.edu.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.edu.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EnquiryResource REST controller.
 *
 * @see EnquiryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EduApp.class)
public class EnquiryResourceIntTest {

    private static final Instant DEFAULT_ENQUIRY_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ENQUIRY_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    @Autowired
    private EnquiryRepository enquiryRepository;

    @Autowired
    private EnquiryMapper enquiryMapper;

    @Autowired
    private EnquiryService enquiryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEnquiryMockMvc;

    private Enquiry enquiry;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnquiryResource enquiryResource = new EnquiryResource(enquiryService);
        this.restEnquiryMockMvc = MockMvcBuilders.standaloneSetup(enquiryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Enquiry createEntity(EntityManager em) {
        Enquiry enquiry = new Enquiry()
            .enquiryDate(DEFAULT_ENQUIRY_DATE)
            .comment(DEFAULT_COMMENT)
            .phone(DEFAULT_PHONE)
            .email(DEFAULT_EMAIL)
            .address(DEFAULT_ADDRESS);
        return enquiry;
    }

    @Before
    public void initTest() {
        enquiry = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnquiry() throws Exception {
        int databaseSizeBeforeCreate = enquiryRepository.findAll().size();

        // Create the Enquiry
        EnquiryDTO enquiryDTO = enquiryMapper.toDto(enquiry);
        restEnquiryMockMvc.perform(post("/api/enquiries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enquiryDTO)))
            .andExpect(status().isCreated());

        // Validate the Enquiry in the database
        List<Enquiry> enquiryList = enquiryRepository.findAll();
        assertThat(enquiryList).hasSize(databaseSizeBeforeCreate + 1);
        Enquiry testEnquiry = enquiryList.get(enquiryList.size() - 1);
        assertThat(testEnquiry.getEnquiryDate()).isEqualTo(DEFAULT_ENQUIRY_DATE);
        assertThat(testEnquiry.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testEnquiry.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testEnquiry.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testEnquiry.getAddress()).isEqualTo(DEFAULT_ADDRESS);
    }

    @Test
    @Transactional
    public void createEnquiryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enquiryRepository.findAll().size();

        // Create the Enquiry with an existing ID
        enquiry.setId(1L);
        EnquiryDTO enquiryDTO = enquiryMapper.toDto(enquiry);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnquiryMockMvc.perform(post("/api/enquiries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enquiryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Enquiry in the database
        List<Enquiry> enquiryList = enquiryRepository.findAll();
        assertThat(enquiryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEnquiries() throws Exception {
        // Initialize the database
        enquiryRepository.saveAndFlush(enquiry);

        // Get all the enquiryList
        restEnquiryMockMvc.perform(get("/api/enquiries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enquiry.getId().intValue())))
            .andExpect(jsonPath("$.[*].enquiryDate").value(hasItem(DEFAULT_ENQUIRY_DATE.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())));
    }

    @Test
    @Transactional
    public void getEnquiry() throws Exception {
        // Initialize the database
        enquiryRepository.saveAndFlush(enquiry);

        // Get the enquiry
        restEnquiryMockMvc.perform(get("/api/enquiries/{id}", enquiry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enquiry.getId().intValue()))
            .andExpect(jsonPath("$.enquiryDate").value(DEFAULT_ENQUIRY_DATE.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEnquiry() throws Exception {
        // Get the enquiry
        restEnquiryMockMvc.perform(get("/api/enquiries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnquiry() throws Exception {
        // Initialize the database
        enquiryRepository.saveAndFlush(enquiry);
        int databaseSizeBeforeUpdate = enquiryRepository.findAll().size();

        // Update the enquiry
        Enquiry updatedEnquiry = enquiryRepository.findOne(enquiry.getId());
        // Disconnect from session so that the updates on updatedEnquiry are not directly saved in db
        em.detach(updatedEnquiry);
        updatedEnquiry
            .enquiryDate(UPDATED_ENQUIRY_DATE)
            .comment(UPDATED_COMMENT)
            .phone(UPDATED_PHONE)
            .email(UPDATED_EMAIL)
            .address(UPDATED_ADDRESS);
        EnquiryDTO enquiryDTO = enquiryMapper.toDto(updatedEnquiry);

        restEnquiryMockMvc.perform(put("/api/enquiries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enquiryDTO)))
            .andExpect(status().isOk());

        // Validate the Enquiry in the database
        List<Enquiry> enquiryList = enquiryRepository.findAll();
        assertThat(enquiryList).hasSize(databaseSizeBeforeUpdate);
        Enquiry testEnquiry = enquiryList.get(enquiryList.size() - 1);
        assertThat(testEnquiry.getEnquiryDate()).isEqualTo(UPDATED_ENQUIRY_DATE);
        assertThat(testEnquiry.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testEnquiry.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testEnquiry.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testEnquiry.getAddress()).isEqualTo(UPDATED_ADDRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingEnquiry() throws Exception {
        int databaseSizeBeforeUpdate = enquiryRepository.findAll().size();

        // Create the Enquiry
        EnquiryDTO enquiryDTO = enquiryMapper.toDto(enquiry);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEnquiryMockMvc.perform(put("/api/enquiries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enquiryDTO)))
            .andExpect(status().isCreated());

        // Validate the Enquiry in the database
        List<Enquiry> enquiryList = enquiryRepository.findAll();
        assertThat(enquiryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEnquiry() throws Exception {
        // Initialize the database
        enquiryRepository.saveAndFlush(enquiry);
        int databaseSizeBeforeDelete = enquiryRepository.findAll().size();

        // Get the enquiry
        restEnquiryMockMvc.perform(delete("/api/enquiries/{id}", enquiry.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Enquiry> enquiryList = enquiryRepository.findAll();
        assertThat(enquiryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enquiry.class);
        Enquiry enquiry1 = new Enquiry();
        enquiry1.setId(1L);
        Enquiry enquiry2 = new Enquiry();
        enquiry2.setId(enquiry1.getId());
        assertThat(enquiry1).isEqualTo(enquiry2);
        enquiry2.setId(2L);
        assertThat(enquiry1).isNotEqualTo(enquiry2);
        enquiry1.setId(null);
        assertThat(enquiry1).isNotEqualTo(enquiry2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EnquiryDTO.class);
        EnquiryDTO enquiryDTO1 = new EnquiryDTO();
        enquiryDTO1.setId(1L);
        EnquiryDTO enquiryDTO2 = new EnquiryDTO();
        assertThat(enquiryDTO1).isNotEqualTo(enquiryDTO2);
        enquiryDTO2.setId(enquiryDTO1.getId());
        assertThat(enquiryDTO1).isEqualTo(enquiryDTO2);
        enquiryDTO2.setId(2L);
        assertThat(enquiryDTO1).isNotEqualTo(enquiryDTO2);
        enquiryDTO1.setId(null);
        assertThat(enquiryDTO1).isNotEqualTo(enquiryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(enquiryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(enquiryMapper.fromId(null)).isNull();
    }
}
