package com.edu.web.rest;

import com.edu.EduApp;

import com.edu.domain.Classroom;
import com.edu.repository.ClassroomRepository;
import com.edu.service.ClassroomService;
import com.edu.service.dto.ClassroomDTO;
import com.edu.service.mapper.ClassroomMapper;
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
 * Test class for the ClassroomResource REST controller.
 *
 * @see ClassroomResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EduApp.class)
public class ClassroomResourceIntTest {

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

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private ClassroomMapper classroomMapper;

    @Autowired
    private ClassroomService classroomService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restClassroomMockMvc;

    private Classroom classroom;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClassroomResource classroomResource = new ClassroomResource(classroomService);
        this.restClassroomMockMvc = MockMvcBuilders.standaloneSetup(classroomResource)
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
    public static Classroom createEntity(EntityManager em) {
        Classroom classroom = new Classroom()
            .status(DEFAULT_STATUS)
            .createDate(DEFAULT_CREATE_DATE)
            .modDate(DEFAULT_MOD_DATE)
            .actualDate(DEFAULT_ACTUAL_DATE)
            .actualDuration(DEFAULT_ACTUAL_DURATION)
            .sudentPresent(DEFAULT_SUDENT_PRESENT);
        return classroom;
    }

    @Before
    public void initTest() {
        classroom = createEntity(em);
    }

    @Test
    @Transactional
    public void createClassroom() throws Exception {
        int databaseSizeBeforeCreate = classroomRepository.findAll().size();

        // Create the Classroom
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);
        restClassroomMockMvc.perform(post("/api/classrooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classroomDTO)))
            .andExpect(status().isCreated());

        // Validate the Classroom in the database
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeCreate + 1);
        Classroom testClassroom = classroomList.get(classroomList.size() - 1);
        assertThat(testClassroom.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testClassroom.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testClassroom.getModDate()).isEqualTo(DEFAULT_MOD_DATE);
        assertThat(testClassroom.getActualDate()).isEqualTo(DEFAULT_ACTUAL_DATE);
        assertThat(testClassroom.getActualDuration()).isEqualTo(DEFAULT_ACTUAL_DURATION);
        assertThat(testClassroom.getSudentPresent()).isEqualTo(DEFAULT_SUDENT_PRESENT);
    }

    @Test
    @Transactional
    public void createClassroomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = classroomRepository.findAll().size();

        // Create the Classroom with an existing ID
        classroom.setId(1L);
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClassroomMockMvc.perform(post("/api/classrooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classroomDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Classroom in the database
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllClassrooms() throws Exception {
        // Initialize the database
        classroomRepository.saveAndFlush(classroom);

        // Get all the classroomList
        restClassroomMockMvc.perform(get("/api/classrooms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(classroom.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].modDate").value(hasItem(DEFAULT_MOD_DATE.toString())))
            .andExpect(jsonPath("$.[*].actualDate").value(hasItem(DEFAULT_ACTUAL_DATE)))
            .andExpect(jsonPath("$.[*].actualDuration").value(hasItem(DEFAULT_ACTUAL_DURATION)))
            .andExpect(jsonPath("$.[*].sudentPresent").value(hasItem(DEFAULT_SUDENT_PRESENT)));
    }

    @Test
    @Transactional
    public void getClassroom() throws Exception {
        // Initialize the database
        classroomRepository.saveAndFlush(classroom);

        // Get the classroom
        restClassroomMockMvc.perform(get("/api/classrooms/{id}", classroom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(classroom.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.modDate").value(DEFAULT_MOD_DATE.toString()))
            .andExpect(jsonPath("$.actualDate").value(DEFAULT_ACTUAL_DATE))
            .andExpect(jsonPath("$.actualDuration").value(DEFAULT_ACTUAL_DURATION))
            .andExpect(jsonPath("$.sudentPresent").value(DEFAULT_SUDENT_PRESENT));
    }

    @Test
    @Transactional
    public void getNonExistingClassroom() throws Exception {
        // Get the classroom
        restClassroomMockMvc.perform(get("/api/classrooms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClassroom() throws Exception {
        // Initialize the database
        classroomRepository.saveAndFlush(classroom);
        int databaseSizeBeforeUpdate = classroomRepository.findAll().size();

        // Update the classroom
        Classroom updatedClassroom = classroomRepository.findOne(classroom.getId());
        // Disconnect from session so that the updates on updatedClassroom are not directly saved in db
        em.detach(updatedClassroom);
        updatedClassroom
            .status(UPDATED_STATUS)
            .createDate(UPDATED_CREATE_DATE)
            .modDate(UPDATED_MOD_DATE)
            .actualDate(UPDATED_ACTUAL_DATE)
            .actualDuration(UPDATED_ACTUAL_DURATION)
            .sudentPresent(UPDATED_SUDENT_PRESENT);
        ClassroomDTO classroomDTO = classroomMapper.toDto(updatedClassroom);

        restClassroomMockMvc.perform(put("/api/classrooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classroomDTO)))
            .andExpect(status().isOk());

        // Validate the Classroom in the database
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeUpdate);
        Classroom testClassroom = classroomList.get(classroomList.size() - 1);
        assertThat(testClassroom.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testClassroom.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testClassroom.getModDate()).isEqualTo(UPDATED_MOD_DATE);
        assertThat(testClassroom.getActualDate()).isEqualTo(UPDATED_ACTUAL_DATE);
        assertThat(testClassroom.getActualDuration()).isEqualTo(UPDATED_ACTUAL_DURATION);
        assertThat(testClassroom.getSudentPresent()).isEqualTo(UPDATED_SUDENT_PRESENT);
    }

    @Test
    @Transactional
    public void updateNonExistingClassroom() throws Exception {
        int databaseSizeBeforeUpdate = classroomRepository.findAll().size();

        // Create the Classroom
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restClassroomMockMvc.perform(put("/api/classrooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classroomDTO)))
            .andExpect(status().isCreated());

        // Validate the Classroom in the database
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteClassroom() throws Exception {
        // Initialize the database
        classroomRepository.saveAndFlush(classroom);
        int databaseSizeBeforeDelete = classroomRepository.findAll().size();

        // Get the classroom
        restClassroomMockMvc.perform(delete("/api/classrooms/{id}", classroom.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Classroom.class);
        Classroom classroom1 = new Classroom();
        classroom1.setId(1L);
        Classroom classroom2 = new Classroom();
        classroom2.setId(classroom1.getId());
        assertThat(classroom1).isEqualTo(classroom2);
        classroom2.setId(2L);
        assertThat(classroom1).isNotEqualTo(classroom2);
        classroom1.setId(null);
        assertThat(classroom1).isNotEqualTo(classroom2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClassroomDTO.class);
        ClassroomDTO classroomDTO1 = new ClassroomDTO();
        classroomDTO1.setId(1L);
        ClassroomDTO classroomDTO2 = new ClassroomDTO();
        assertThat(classroomDTO1).isNotEqualTo(classroomDTO2);
        classroomDTO2.setId(classroomDTO1.getId());
        assertThat(classroomDTO1).isEqualTo(classroomDTO2);
        classroomDTO2.setId(2L);
        assertThat(classroomDTO1).isNotEqualTo(classroomDTO2);
        classroomDTO1.setId(null);
        assertThat(classroomDTO1).isNotEqualTo(classroomDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(classroomMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(classroomMapper.fromId(null)).isNull();
    }
}
