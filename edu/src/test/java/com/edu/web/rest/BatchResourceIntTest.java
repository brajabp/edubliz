package com.edu.web.rest;

import com.edu.EduApp;

import com.edu.domain.Batch;
import com.edu.repository.BatchRepository;
import com.edu.service.BatchService;
import com.edu.service.dto.BatchDTO;
import com.edu.service.mapper.BatchMapper;
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
 * Test class for the BatchResource REST controller.
 *
 * @see BatchResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EduApp.class)
public class BatchResourceIntTest {

    private static final Status DEFAULT_STATUS = Status.ACTIVE;
    private static final Status UPDATED_STATUS = Status.INACTIVE;

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_MOD_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MOD_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_START_DATE = 1;
    private static final Integer UPDATED_START_DATE = 2;

    private static final Integer DEFAULT_END_DATE = 1;
    private static final Integer UPDATED_END_DATE = 2;

    private static final Integer DEFAULT_SUDENT_CAPACITY = 1;
    private static final Integer UPDATED_SUDENT_CAPACITY = 2;

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private BatchMapper batchMapper;

    @Autowired
    private BatchService batchService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBatchMockMvc;

    private Batch batch;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BatchResource batchResource = new BatchResource(batchService);
        this.restBatchMockMvc = MockMvcBuilders.standaloneSetup(batchResource)
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
    public static Batch createEntity(EntityManager em) {
        Batch batch = new Batch()
            .status(DEFAULT_STATUS)
            .createDate(DEFAULT_CREATE_DATE)
            .modDate(DEFAULT_MOD_DATE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .sudentCapacity(DEFAULT_SUDENT_CAPACITY);
        return batch;
    }

    @Before
    public void initTest() {
        batch = createEntity(em);
    }

    @Test
    @Transactional
    public void createBatch() throws Exception {
        int databaseSizeBeforeCreate = batchRepository.findAll().size();

        // Create the Batch
        BatchDTO batchDTO = batchMapper.toDto(batch);
        restBatchMockMvc.perform(post("/api/batches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(batchDTO)))
            .andExpect(status().isCreated());

        // Validate the Batch in the database
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeCreate + 1);
        Batch testBatch = batchList.get(batchList.size() - 1);
        assertThat(testBatch.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testBatch.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testBatch.getModDate()).isEqualTo(DEFAULT_MOD_DATE);
        assertThat(testBatch.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testBatch.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testBatch.getSudentCapacity()).isEqualTo(DEFAULT_SUDENT_CAPACITY);
    }

    @Test
    @Transactional
    public void createBatchWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = batchRepository.findAll().size();

        // Create the Batch with an existing ID
        batch.setId(1L);
        BatchDTO batchDTO = batchMapper.toDto(batch);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBatchMockMvc.perform(post("/api/batches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(batchDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Batch in the database
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBatches() throws Exception {
        // Initialize the database
        batchRepository.saveAndFlush(batch);

        // Get all the batchList
        restBatchMockMvc.perform(get("/api/batches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(batch.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].modDate").value(hasItem(DEFAULT_MOD_DATE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE)))
            .andExpect(jsonPath("$.[*].sudentCapacity").value(hasItem(DEFAULT_SUDENT_CAPACITY)));
    }

    @Test
    @Transactional
    public void getBatch() throws Exception {
        // Initialize the database
        batchRepository.saveAndFlush(batch);

        // Get the batch
        restBatchMockMvc.perform(get("/api/batches/{id}", batch.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(batch.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.modDate").value(DEFAULT_MOD_DATE.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE))
            .andExpect(jsonPath("$.sudentCapacity").value(DEFAULT_SUDENT_CAPACITY));
    }

    @Test
    @Transactional
    public void getNonExistingBatch() throws Exception {
        // Get the batch
        restBatchMockMvc.perform(get("/api/batches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBatch() throws Exception {
        // Initialize the database
        batchRepository.saveAndFlush(batch);
        int databaseSizeBeforeUpdate = batchRepository.findAll().size();

        // Update the batch
        Batch updatedBatch = batchRepository.findOne(batch.getId());
        // Disconnect from session so that the updates on updatedBatch are not directly saved in db
        em.detach(updatedBatch);
        updatedBatch
            .status(UPDATED_STATUS)
            .createDate(UPDATED_CREATE_DATE)
            .modDate(UPDATED_MOD_DATE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .sudentCapacity(UPDATED_SUDENT_CAPACITY);
        BatchDTO batchDTO = batchMapper.toDto(updatedBatch);

        restBatchMockMvc.perform(put("/api/batches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(batchDTO)))
            .andExpect(status().isOk());

        // Validate the Batch in the database
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeUpdate);
        Batch testBatch = batchList.get(batchList.size() - 1);
        assertThat(testBatch.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testBatch.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testBatch.getModDate()).isEqualTo(UPDATED_MOD_DATE);
        assertThat(testBatch.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testBatch.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testBatch.getSudentCapacity()).isEqualTo(UPDATED_SUDENT_CAPACITY);
    }

    @Test
    @Transactional
    public void updateNonExistingBatch() throws Exception {
        int databaseSizeBeforeUpdate = batchRepository.findAll().size();

        // Create the Batch
        BatchDTO batchDTO = batchMapper.toDto(batch);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBatchMockMvc.perform(put("/api/batches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(batchDTO)))
            .andExpect(status().isCreated());

        // Validate the Batch in the database
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBatch() throws Exception {
        // Initialize the database
        batchRepository.saveAndFlush(batch);
        int databaseSizeBeforeDelete = batchRepository.findAll().size();

        // Get the batch
        restBatchMockMvc.perform(delete("/api/batches/{id}", batch.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Batch.class);
        Batch batch1 = new Batch();
        batch1.setId(1L);
        Batch batch2 = new Batch();
        batch2.setId(batch1.getId());
        assertThat(batch1).isEqualTo(batch2);
        batch2.setId(2L);
        assertThat(batch1).isNotEqualTo(batch2);
        batch1.setId(null);
        assertThat(batch1).isNotEqualTo(batch2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BatchDTO.class);
        BatchDTO batchDTO1 = new BatchDTO();
        batchDTO1.setId(1L);
        BatchDTO batchDTO2 = new BatchDTO();
        assertThat(batchDTO1).isNotEqualTo(batchDTO2);
        batchDTO2.setId(batchDTO1.getId());
        assertThat(batchDTO1).isEqualTo(batchDTO2);
        batchDTO2.setId(2L);
        assertThat(batchDTO1).isNotEqualTo(batchDTO2);
        batchDTO1.setId(null);
        assertThat(batchDTO1).isNotEqualTo(batchDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(batchMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(batchMapper.fromId(null)).isNull();
    }
}
