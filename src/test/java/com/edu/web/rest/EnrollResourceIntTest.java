package com.edu.web.rest;

import com.edu.EduApp;

import com.edu.domain.Enroll;
import com.edu.repository.EnrollRepository;
import com.edu.service.EnrollService;
import com.edu.service.dto.EnrollDTO;
import com.edu.service.mapper.EnrollMapper;
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

import com.edu.domain.enumeration.AccountStatus;
/**
 * Test class for the EnrollResource REST controller.
 *
 * @see EnrollResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EduApp.class)
public class EnrollResourceIntTest {

    private static final AccountStatus DEFAULT_ACCOUNT_STATUS = AccountStatus.PENDING;
    private static final AccountStatus UPDATED_ACCOUNT_STATUS = AccountStatus.SUBSCRIBED;

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_MOD_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MOD_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EnrollRepository enrollRepository;

    @Autowired
    private EnrollMapper enrollMapper;

    @Autowired
    private EnrollService enrollService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEnrollMockMvc;

    private Enroll enroll;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnrollResource enrollResource = new EnrollResource(enrollService);
        this.restEnrollMockMvc = MockMvcBuilders.standaloneSetup(enrollResource)
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
    public static Enroll createEntity(EntityManager em) {
        Enroll enroll = new Enroll()
            .accountStatus(DEFAULT_ACCOUNT_STATUS)
            .createDate(DEFAULT_CREATE_DATE)
            .modDate(DEFAULT_MOD_DATE);
        return enroll;
    }

    @Before
    public void initTest() {
        enroll = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnroll() throws Exception {
        int databaseSizeBeforeCreate = enrollRepository.findAll().size();

        // Create the Enroll
        EnrollDTO enrollDTO = enrollMapper.toDto(enroll);
        restEnrollMockMvc.perform(post("/api/enrolls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollDTO)))
            .andExpect(status().isCreated());

        // Validate the Enroll in the database
        List<Enroll> enrollList = enrollRepository.findAll();
        assertThat(enrollList).hasSize(databaseSizeBeforeCreate + 1);
        Enroll testEnroll = enrollList.get(enrollList.size() - 1);
        assertThat(testEnroll.getAccountStatus()).isEqualTo(DEFAULT_ACCOUNT_STATUS);
        assertThat(testEnroll.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testEnroll.getModDate()).isEqualTo(DEFAULT_MOD_DATE);
    }

    @Test
    @Transactional
    public void createEnrollWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enrollRepository.findAll().size();

        // Create the Enroll with an existing ID
        enroll.setId(1L);
        EnrollDTO enrollDTO = enrollMapper.toDto(enroll);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnrollMockMvc.perform(post("/api/enrolls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Enroll in the database
        List<Enroll> enrollList = enrollRepository.findAll();
        assertThat(enrollList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEnrolls() throws Exception {
        // Initialize the database
        enrollRepository.saveAndFlush(enroll);

        // Get all the enrollList
        restEnrollMockMvc.perform(get("/api/enrolls?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enroll.getId().intValue())))
            .andExpect(jsonPath("$.[*].accountStatus").value(hasItem(DEFAULT_ACCOUNT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].modDate").value(hasItem(DEFAULT_MOD_DATE.toString())));
    }

    @Test
    @Transactional
    public void getEnroll() throws Exception {
        // Initialize the database
        enrollRepository.saveAndFlush(enroll);

        // Get the enroll
        restEnrollMockMvc.perform(get("/api/enrolls/{id}", enroll.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enroll.getId().intValue()))
            .andExpect(jsonPath("$.accountStatus").value(DEFAULT_ACCOUNT_STATUS.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.modDate").value(DEFAULT_MOD_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEnroll() throws Exception {
        // Get the enroll
        restEnrollMockMvc.perform(get("/api/enrolls/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnroll() throws Exception {
        // Initialize the database
        enrollRepository.saveAndFlush(enroll);
        int databaseSizeBeforeUpdate = enrollRepository.findAll().size();

        // Update the enroll
        Enroll updatedEnroll = enrollRepository.findOne(enroll.getId());
        // Disconnect from session so that the updates on updatedEnroll are not directly saved in db
        em.detach(updatedEnroll);
        updatedEnroll
            .accountStatus(UPDATED_ACCOUNT_STATUS)
            .createDate(UPDATED_CREATE_DATE)
            .modDate(UPDATED_MOD_DATE);
        EnrollDTO enrollDTO = enrollMapper.toDto(updatedEnroll);

        restEnrollMockMvc.perform(put("/api/enrolls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollDTO)))
            .andExpect(status().isOk());

        // Validate the Enroll in the database
        List<Enroll> enrollList = enrollRepository.findAll();
        assertThat(enrollList).hasSize(databaseSizeBeforeUpdate);
        Enroll testEnroll = enrollList.get(enrollList.size() - 1);
        assertThat(testEnroll.getAccountStatus()).isEqualTo(UPDATED_ACCOUNT_STATUS);
        assertThat(testEnroll.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testEnroll.getModDate()).isEqualTo(UPDATED_MOD_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingEnroll() throws Exception {
        int databaseSizeBeforeUpdate = enrollRepository.findAll().size();

        // Create the Enroll
        EnrollDTO enrollDTO = enrollMapper.toDto(enroll);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEnrollMockMvc.perform(put("/api/enrolls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollDTO)))
            .andExpect(status().isCreated());

        // Validate the Enroll in the database
        List<Enroll> enrollList = enrollRepository.findAll();
        assertThat(enrollList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEnroll() throws Exception {
        // Initialize the database
        enrollRepository.saveAndFlush(enroll);
        int databaseSizeBeforeDelete = enrollRepository.findAll().size();

        // Get the enroll
        restEnrollMockMvc.perform(delete("/api/enrolls/{id}", enroll.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Enroll> enrollList = enrollRepository.findAll();
        assertThat(enrollList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enroll.class);
        Enroll enroll1 = new Enroll();
        enroll1.setId(1L);
        Enroll enroll2 = new Enroll();
        enroll2.setId(enroll1.getId());
        assertThat(enroll1).isEqualTo(enroll2);
        enroll2.setId(2L);
        assertThat(enroll1).isNotEqualTo(enroll2);
        enroll1.setId(null);
        assertThat(enroll1).isNotEqualTo(enroll2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EnrollDTO.class);
        EnrollDTO enrollDTO1 = new EnrollDTO();
        enrollDTO1.setId(1L);
        EnrollDTO enrollDTO2 = new EnrollDTO();
        assertThat(enrollDTO1).isNotEqualTo(enrollDTO2);
        enrollDTO2.setId(enrollDTO1.getId());
        assertThat(enrollDTO1).isEqualTo(enrollDTO2);
        enrollDTO2.setId(2L);
        assertThat(enrollDTO1).isNotEqualTo(enrollDTO2);
        enrollDTO1.setId(null);
        assertThat(enrollDTO1).isNotEqualTo(enrollDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(enrollMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(enrollMapper.fromId(null)).isNull();
    }
}
