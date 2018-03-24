package com.edu.web.rest;

import com.edu.EduApp;

import com.edu.domain.FollowUp;
import com.edu.repository.FollowUpRepository;
import com.edu.service.FollowUpService;
import com.edu.service.dto.FollowUpDTO;
import com.edu.service.mapper.FollowUpMapper;
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
 * Test class for the FollowUpResource REST controller.
 *
 * @see FollowUpResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EduApp.class)
public class FollowUpResourceIntTest {

    private static final Instant DEFAULT_FOLLOW_UP_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FOLLOW_UP_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private FollowUpRepository followUpRepository;

    @Autowired
    private FollowUpMapper followUpMapper;

    @Autowired
    private FollowUpService followUpService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFollowUpMockMvc;

    private FollowUp followUp;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FollowUpResource followUpResource = new FollowUpResource(followUpService);
        this.restFollowUpMockMvc = MockMvcBuilders.standaloneSetup(followUpResource)
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
    public static FollowUp createEntity(EntityManager em) {
        FollowUp followUp = new FollowUp()
            .followUpDate(DEFAULT_FOLLOW_UP_DATE)
            .comment(DEFAULT_COMMENT);
        return followUp;
    }

    @Before
    public void initTest() {
        followUp = createEntity(em);
    }

    @Test
    @Transactional
    public void createFollowUp() throws Exception {
        int databaseSizeBeforeCreate = followUpRepository.findAll().size();

        // Create the FollowUp
        FollowUpDTO followUpDTO = followUpMapper.toDto(followUp);
        restFollowUpMockMvc.perform(post("/api/follow-ups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(followUpDTO)))
            .andExpect(status().isCreated());

        // Validate the FollowUp in the database
        List<FollowUp> followUpList = followUpRepository.findAll();
        assertThat(followUpList).hasSize(databaseSizeBeforeCreate + 1);
        FollowUp testFollowUp = followUpList.get(followUpList.size() - 1);
        assertThat(testFollowUp.getFollowUpDate()).isEqualTo(DEFAULT_FOLLOW_UP_DATE);
        assertThat(testFollowUp.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    @Transactional
    public void createFollowUpWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = followUpRepository.findAll().size();

        // Create the FollowUp with an existing ID
        followUp.setId(1L);
        FollowUpDTO followUpDTO = followUpMapper.toDto(followUp);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFollowUpMockMvc.perform(post("/api/follow-ups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(followUpDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FollowUp in the database
        List<FollowUp> followUpList = followUpRepository.findAll();
        assertThat(followUpList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFollowUps() throws Exception {
        // Initialize the database
        followUpRepository.saveAndFlush(followUp);

        // Get all the followUpList
        restFollowUpMockMvc.perform(get("/api/follow-ups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(followUp.getId().intValue())))
            .andExpect(jsonPath("$.[*].followUpDate").value(hasItem(DEFAULT_FOLLOW_UP_DATE.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }

    @Test
    @Transactional
    public void getFollowUp() throws Exception {
        // Initialize the database
        followUpRepository.saveAndFlush(followUp);

        // Get the followUp
        restFollowUpMockMvc.perform(get("/api/follow-ups/{id}", followUp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(followUp.getId().intValue()))
            .andExpect(jsonPath("$.followUpDate").value(DEFAULT_FOLLOW_UP_DATE.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFollowUp() throws Exception {
        // Get the followUp
        restFollowUpMockMvc.perform(get("/api/follow-ups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFollowUp() throws Exception {
        // Initialize the database
        followUpRepository.saveAndFlush(followUp);
        int databaseSizeBeforeUpdate = followUpRepository.findAll().size();

        // Update the followUp
        FollowUp updatedFollowUp = followUpRepository.findOne(followUp.getId());
        // Disconnect from session so that the updates on updatedFollowUp are not directly saved in db
        em.detach(updatedFollowUp);
        updatedFollowUp
            .followUpDate(UPDATED_FOLLOW_UP_DATE)
            .comment(UPDATED_COMMENT);
        FollowUpDTO followUpDTO = followUpMapper.toDto(updatedFollowUp);

        restFollowUpMockMvc.perform(put("/api/follow-ups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(followUpDTO)))
            .andExpect(status().isOk());

        // Validate the FollowUp in the database
        List<FollowUp> followUpList = followUpRepository.findAll();
        assertThat(followUpList).hasSize(databaseSizeBeforeUpdate);
        FollowUp testFollowUp = followUpList.get(followUpList.size() - 1);
        assertThat(testFollowUp.getFollowUpDate()).isEqualTo(UPDATED_FOLLOW_UP_DATE);
        assertThat(testFollowUp.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingFollowUp() throws Exception {
        int databaseSizeBeforeUpdate = followUpRepository.findAll().size();

        // Create the FollowUp
        FollowUpDTO followUpDTO = followUpMapper.toDto(followUp);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFollowUpMockMvc.perform(put("/api/follow-ups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(followUpDTO)))
            .andExpect(status().isCreated());

        // Validate the FollowUp in the database
        List<FollowUp> followUpList = followUpRepository.findAll();
        assertThat(followUpList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFollowUp() throws Exception {
        // Initialize the database
        followUpRepository.saveAndFlush(followUp);
        int databaseSizeBeforeDelete = followUpRepository.findAll().size();

        // Get the followUp
        restFollowUpMockMvc.perform(delete("/api/follow-ups/{id}", followUp.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FollowUp> followUpList = followUpRepository.findAll();
        assertThat(followUpList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FollowUp.class);
        FollowUp followUp1 = new FollowUp();
        followUp1.setId(1L);
        FollowUp followUp2 = new FollowUp();
        followUp2.setId(followUp1.getId());
        assertThat(followUp1).isEqualTo(followUp2);
        followUp2.setId(2L);
        assertThat(followUp1).isNotEqualTo(followUp2);
        followUp1.setId(null);
        assertThat(followUp1).isNotEqualTo(followUp2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FollowUpDTO.class);
        FollowUpDTO followUpDTO1 = new FollowUpDTO();
        followUpDTO1.setId(1L);
        FollowUpDTO followUpDTO2 = new FollowUpDTO();
        assertThat(followUpDTO1).isNotEqualTo(followUpDTO2);
        followUpDTO2.setId(followUpDTO1.getId());
        assertThat(followUpDTO1).isEqualTo(followUpDTO2);
        followUpDTO2.setId(2L);
        assertThat(followUpDTO1).isNotEqualTo(followUpDTO2);
        followUpDTO1.setId(null);
        assertThat(followUpDTO1).isNotEqualTo(followUpDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(followUpMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(followUpMapper.fromId(null)).isNull();
    }
}
