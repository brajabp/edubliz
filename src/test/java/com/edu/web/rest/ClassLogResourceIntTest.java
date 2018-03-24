package com.edu.web.rest;

import com.edu.EduApp;

import com.edu.domain.ClassLog;
import com.edu.repository.ClassLogRepository;
import com.edu.service.ClassLogService;
import com.edu.service.dto.ClassLogDTO;
import com.edu.service.mapper.ClassLogMapper;
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
import com.edu.domain.enumeration.LogType;
/**
 * Test class for the ClassLogResource REST controller.
 *
 * @see ClassLogResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EduApp.class)
public class ClassLogResourceIntTest {

    private static final Status DEFAULT_STATUS = Status.ACTIVE;
    private static final Status UPDATED_STATUS = Status.INACTIVE;

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_MOD_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MOD_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_ACTUAL_DATE = 1;
    private static final Integer UPDATED_ACTUAL_DATE = 2;

    private static final Integer DEFAULT_ACTUAL_DURATION = 1;
    private static final Integer UPDATED_ACTUAL_DURATION = 2;

    private static final Integer DEFAULT_SUDENT_PRESENT = 1;
    private static final Integer UPDATED_SUDENT_PRESENT = 2;

    private static final LogType DEFAULT_LOG_TYPE = LogType.TEACHER_JOINED;
    private static final LogType UPDATED_LOG_TYPE = LogType.STUDENT_JOINED;

    @Autowired
    private ClassLogRepository classLogRepository;

    @Autowired
    private ClassLogMapper classLogMapper;

    @Autowired
    private ClassLogService classLogService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restClassLogMockMvc;

    private ClassLog classLog;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClassLogResource classLogResource = new ClassLogResource(classLogService);
        this.restClassLogMockMvc = MockMvcBuilders.standaloneSetup(classLogResource)
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
    public static ClassLog createEntity(EntityManager em) {
        ClassLog classLog = new ClassLog()
            .status(DEFAULT_STATUS)
            .createDate(DEFAULT_CREATE_DATE)
            .modDate(DEFAULT_MOD_DATE)
            .actualDate(DEFAULT_ACTUAL_DATE)
            .actualDuration(DEFAULT_ACTUAL_DURATION)
            .sudentPresent(DEFAULT_SUDENT_PRESENT)
            .logType(DEFAULT_LOG_TYPE);
        return classLog;
    }

    @Before
    public void initTest() {
        classLog = createEntity(em);
    }

    @Test
    @Transactional
    public void createClassLog() throws Exception {
        int databaseSizeBeforeCreate = classLogRepository.findAll().size();

        // Create the ClassLog
        ClassLogDTO classLogDTO = classLogMapper.toDto(classLog);
        restClassLogMockMvc.perform(post("/api/class-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classLogDTO)))
            .andExpect(status().isCreated());

        // Validate the ClassLog in the database
        List<ClassLog> classLogList = classLogRepository.findAll();
        assertThat(classLogList).hasSize(databaseSizeBeforeCreate + 1);
        ClassLog testClassLog = classLogList.get(classLogList.size() - 1);
        assertThat(testClassLog.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testClassLog.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testClassLog.getModDate()).isEqualTo(DEFAULT_MOD_DATE);
        assertThat(testClassLog.getActualDate()).isEqualTo(DEFAULT_ACTUAL_DATE);
        assertThat(testClassLog.getActualDuration()).isEqualTo(DEFAULT_ACTUAL_DURATION);
        assertThat(testClassLog.getSudentPresent()).isEqualTo(DEFAULT_SUDENT_PRESENT);
        assertThat(testClassLog.getLogType()).isEqualTo(DEFAULT_LOG_TYPE);
    }

    @Test
    @Transactional
    public void createClassLogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = classLogRepository.findAll().size();

        // Create the ClassLog with an existing ID
        classLog.setId(1L);
        ClassLogDTO classLogDTO = classLogMapper.toDto(classLog);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClassLogMockMvc.perform(post("/api/class-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classLogDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ClassLog in the database
        List<ClassLog> classLogList = classLogRepository.findAll();
        assertThat(classLogList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllClassLogs() throws Exception {
        // Initialize the database
        classLogRepository.saveAndFlush(classLog);

        // Get all the classLogList
        restClassLogMockMvc.perform(get("/api/class-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(classLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].modDate").value(hasItem(DEFAULT_MOD_DATE.toString())))
            .andExpect(jsonPath("$.[*].actualDate").value(hasItem(DEFAULT_ACTUAL_DATE)))
            .andExpect(jsonPath("$.[*].actualDuration").value(hasItem(DEFAULT_ACTUAL_DURATION)))
            .andExpect(jsonPath("$.[*].sudentPresent").value(hasItem(DEFAULT_SUDENT_PRESENT)))
            .andExpect(jsonPath("$.[*].logType").value(hasItem(DEFAULT_LOG_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getClassLog() throws Exception {
        // Initialize the database
        classLogRepository.saveAndFlush(classLog);

        // Get the classLog
        restClassLogMockMvc.perform(get("/api/class-logs/{id}", classLog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(classLog.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.modDate").value(DEFAULT_MOD_DATE.toString()))
            .andExpect(jsonPath("$.actualDate").value(DEFAULT_ACTUAL_DATE))
            .andExpect(jsonPath("$.actualDuration").value(DEFAULT_ACTUAL_DURATION))
            .andExpect(jsonPath("$.sudentPresent").value(DEFAULT_SUDENT_PRESENT))
            .andExpect(jsonPath("$.logType").value(DEFAULT_LOG_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClassLog() throws Exception {
        // Get the classLog
        restClassLogMockMvc.perform(get("/api/class-logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClassLog() throws Exception {
        // Initialize the database
        classLogRepository.saveAndFlush(classLog);
        int databaseSizeBeforeUpdate = classLogRepository.findAll().size();

        // Update the classLog
        ClassLog updatedClassLog = classLogRepository.findOne(classLog.getId());
        // Disconnect from session so that the updates on updatedClassLog are not directly saved in db
        em.detach(updatedClassLog);
        updatedClassLog
            .status(UPDATED_STATUS)
            .createDate(UPDATED_CREATE_DATE)
            .modDate(UPDATED_MOD_DATE)
            .actualDate(UPDATED_ACTUAL_DATE)
            .actualDuration(UPDATED_ACTUAL_DURATION)
            .sudentPresent(UPDATED_SUDENT_PRESENT)
            .logType(UPDATED_LOG_TYPE);
        ClassLogDTO classLogDTO = classLogMapper.toDto(updatedClassLog);

        restClassLogMockMvc.perform(put("/api/class-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classLogDTO)))
            .andExpect(status().isOk());

        // Validate the ClassLog in the database
        List<ClassLog> classLogList = classLogRepository.findAll();
        assertThat(classLogList).hasSize(databaseSizeBeforeUpdate);
        ClassLog testClassLog = classLogList.get(classLogList.size() - 1);
        assertThat(testClassLog.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testClassLog.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testClassLog.getModDate()).isEqualTo(UPDATED_MOD_DATE);
        assertThat(testClassLog.getActualDate()).isEqualTo(UPDATED_ACTUAL_DATE);
        assertThat(testClassLog.getActualDuration()).isEqualTo(UPDATED_ACTUAL_DURATION);
        assertThat(testClassLog.getSudentPresent()).isEqualTo(UPDATED_SUDENT_PRESENT);
        assertThat(testClassLog.getLogType()).isEqualTo(UPDATED_LOG_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingClassLog() throws Exception {
        int databaseSizeBeforeUpdate = classLogRepository.findAll().size();

        // Create the ClassLog
        ClassLogDTO classLogDTO = classLogMapper.toDto(classLog);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restClassLogMockMvc.perform(put("/api/class-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classLogDTO)))
            .andExpect(status().isCreated());

        // Validate the ClassLog in the database
        List<ClassLog> classLogList = classLogRepository.findAll();
        assertThat(classLogList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteClassLog() throws Exception {
        // Initialize the database
        classLogRepository.saveAndFlush(classLog);
        int databaseSizeBeforeDelete = classLogRepository.findAll().size();

        // Get the classLog
        restClassLogMockMvc.perform(delete("/api/class-logs/{id}", classLog.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ClassLog> classLogList = classLogRepository.findAll();
        assertThat(classLogList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClassLog.class);
        ClassLog classLog1 = new ClassLog();
        classLog1.setId(1L);
        ClassLog classLog2 = new ClassLog();
        classLog2.setId(classLog1.getId());
        assertThat(classLog1).isEqualTo(classLog2);
        classLog2.setId(2L);
        assertThat(classLog1).isNotEqualTo(classLog2);
        classLog1.setId(null);
        assertThat(classLog1).isNotEqualTo(classLog2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClassLogDTO.class);
        ClassLogDTO classLogDTO1 = new ClassLogDTO();
        classLogDTO1.setId(1L);
        ClassLogDTO classLogDTO2 = new ClassLogDTO();
        assertThat(classLogDTO1).isNotEqualTo(classLogDTO2);
        classLogDTO2.setId(classLogDTO1.getId());
        assertThat(classLogDTO1).isEqualTo(classLogDTO2);
        classLogDTO2.setId(2L);
        assertThat(classLogDTO1).isNotEqualTo(classLogDTO2);
        classLogDTO1.setId(null);
        assertThat(classLogDTO1).isNotEqualTo(classLogDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(classLogMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(classLogMapper.fromId(null)).isNull();
    }
}
