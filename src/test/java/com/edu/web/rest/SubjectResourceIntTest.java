package com.edu.web.rest;

import com.edu.EduApp;

import com.edu.domain.Subject;
import com.edu.repository.SubjectRepository;
import com.edu.service.SubjectService;
import com.edu.service.dto.SubjectDTO;
import com.edu.service.mapper.SubjectMapper;
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

import com.edu.domain.enumeration.Status;
/**
 * Test class for the SubjectResource REST controller.
 *
 * @see SubjectResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EduApp.class)
public class SubjectResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Status DEFAULT_STATUS = Status.ACTIVE;
    private static final Status UPDATED_STATUS = Status.INACTIVE;

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_MOD_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MOD_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_FEE = 1L;
    private static final Long UPDATED_FEE = 2L;

    private static final Integer DEFAULT_DURATION_YEAR = 1;
    private static final Integer UPDATED_DURATION_YEAR = 2;

    private static final Integer DEFAULT_DURATION_MONTH = 1;
    private static final Integer UPDATED_DURATION_MONTH = 2;

    private static final Integer DEFAULT_DURATION_DAY = 1;
    private static final Integer UPDATED_DURATION_DAY = 2;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private SubjectMapper subjectMapper;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSubjectMockMvc;

    private Subject subject;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubjectResource subjectResource = new SubjectResource(subjectService);
        this.restSubjectMockMvc = MockMvcBuilders.standaloneSetup(subjectResource)
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
    public static Subject createEntity(EntityManager em) {
        Subject subject = new Subject()
            .name(DEFAULT_NAME)
            .status(DEFAULT_STATUS)
            .createDate(DEFAULT_CREATE_DATE)
            .modDate(DEFAULT_MOD_DATE)
            .fee(DEFAULT_FEE)
            .durationYear(DEFAULT_DURATION_YEAR)
            .durationMonth(DEFAULT_DURATION_MONTH)
            .durationDay(DEFAULT_DURATION_DAY);
        return subject;
    }

    @Before
    public void initTest() {
        subject = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubject() throws Exception {
        int databaseSizeBeforeCreate = subjectRepository.findAll().size();

        // Create the Subject
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);
        restSubjectMockMvc.perform(post("/api/subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectDTO)))
            .andExpect(status().isCreated());

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeCreate + 1);
        Subject testSubject = subjectList.get(subjectList.size() - 1);
        assertThat(testSubject.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSubject.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testSubject.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testSubject.getModDate()).isEqualTo(DEFAULT_MOD_DATE);
        assertThat(testSubject.getFee()).isEqualTo(DEFAULT_FEE);
        assertThat(testSubject.getDurationYear()).isEqualTo(DEFAULT_DURATION_YEAR);
        assertThat(testSubject.getDurationMonth()).isEqualTo(DEFAULT_DURATION_MONTH);
        assertThat(testSubject.getDurationDay()).isEqualTo(DEFAULT_DURATION_DAY);
    }

    @Test
    @Transactional
    public void createSubjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subjectRepository.findAll().size();

        // Create the Subject with an existing ID
        subject.setId(1L);
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubjectMockMvc.perform(post("/api/subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSubjects() throws Exception {
        // Initialize the database
        subjectRepository.saveAndFlush(subject);

        // Get all the subjectList
        restSubjectMockMvc.perform(get("/api/subjects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subject.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].modDate").value(hasItem(DEFAULT_MOD_DATE.toString())))
            .andExpect(jsonPath("$.[*].fee").value(hasItem(DEFAULT_FEE.intValue())))
            .andExpect(jsonPath("$.[*].durationYear").value(hasItem(DEFAULT_DURATION_YEAR)))
            .andExpect(jsonPath("$.[*].durationMonth").value(hasItem(DEFAULT_DURATION_MONTH)))
            .andExpect(jsonPath("$.[*].durationDay").value(hasItem(DEFAULT_DURATION_DAY)));
    }

    @Test
    @Transactional
    public void getSubject() throws Exception {
        // Initialize the database
        subjectRepository.saveAndFlush(subject);

        // Get the subject
        restSubjectMockMvc.perform(get("/api/subjects/{id}", subject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subject.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.modDate").value(DEFAULT_MOD_DATE.toString()))
            .andExpect(jsonPath("$.fee").value(DEFAULT_FEE.intValue()))
            .andExpect(jsonPath("$.durationYear").value(DEFAULT_DURATION_YEAR))
            .andExpect(jsonPath("$.durationMonth").value(DEFAULT_DURATION_MONTH))
            .andExpect(jsonPath("$.durationDay").value(DEFAULT_DURATION_DAY));
    }

    @Test
    @Transactional
    public void getNonExistingSubject() throws Exception {
        // Get the subject
        restSubjectMockMvc.perform(get("/api/subjects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubject() throws Exception {
        // Initialize the database
        subjectRepository.saveAndFlush(subject);
        int databaseSizeBeforeUpdate = subjectRepository.findAll().size();

        // Update the subject
        Subject updatedSubject = subjectRepository.findOne(subject.getId());
        // Disconnect from session so that the updates on updatedSubject are not directly saved in db
        em.detach(updatedSubject);
        updatedSubject
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS)
            .createDate(UPDATED_CREATE_DATE)
            .modDate(UPDATED_MOD_DATE)
            .fee(UPDATED_FEE)
            .durationYear(UPDATED_DURATION_YEAR)
            .durationMonth(UPDATED_DURATION_MONTH)
            .durationDay(UPDATED_DURATION_DAY);
        SubjectDTO subjectDTO = subjectMapper.toDto(updatedSubject);

        restSubjectMockMvc.perform(put("/api/subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectDTO)))
            .andExpect(status().isOk());

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeUpdate);
        Subject testSubject = subjectList.get(subjectList.size() - 1);
        assertThat(testSubject.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSubject.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testSubject.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testSubject.getModDate()).isEqualTo(UPDATED_MOD_DATE);
        assertThat(testSubject.getFee()).isEqualTo(UPDATED_FEE);
        assertThat(testSubject.getDurationYear()).isEqualTo(UPDATED_DURATION_YEAR);
        assertThat(testSubject.getDurationMonth()).isEqualTo(UPDATED_DURATION_MONTH);
        assertThat(testSubject.getDurationDay()).isEqualTo(UPDATED_DURATION_DAY);
    }

    @Test
    @Transactional
    public void updateNonExistingSubject() throws Exception {
        int databaseSizeBeforeUpdate = subjectRepository.findAll().size();

        // Create the Subject
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSubjectMockMvc.perform(put("/api/subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectDTO)))
            .andExpect(status().isCreated());

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSubject() throws Exception {
        // Initialize the database
        subjectRepository.saveAndFlush(subject);
        int databaseSizeBeforeDelete = subjectRepository.findAll().size();

        // Get the subject
        restSubjectMockMvc.perform(delete("/api/subjects/{id}", subject.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Subject.class);
        Subject subject1 = new Subject();
        subject1.setId(1L);
        Subject subject2 = new Subject();
        subject2.setId(subject1.getId());
        assertThat(subject1).isEqualTo(subject2);
        subject2.setId(2L);
        assertThat(subject1).isNotEqualTo(subject2);
        subject1.setId(null);
        assertThat(subject1).isNotEqualTo(subject2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubjectDTO.class);
        SubjectDTO subjectDTO1 = new SubjectDTO();
        subjectDTO1.setId(1L);
        SubjectDTO subjectDTO2 = new SubjectDTO();
        assertThat(subjectDTO1).isNotEqualTo(subjectDTO2);
        subjectDTO2.setId(subjectDTO1.getId());
        assertThat(subjectDTO1).isEqualTo(subjectDTO2);
        subjectDTO2.setId(2L);
        assertThat(subjectDTO1).isNotEqualTo(subjectDTO2);
        subjectDTO1.setId(null);
        assertThat(subjectDTO1).isNotEqualTo(subjectDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subjectMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subjectMapper.fromId(null)).isNull();
    }
}
