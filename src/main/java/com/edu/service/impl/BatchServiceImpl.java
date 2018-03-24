package com.edu.service.impl;

import com.edu.service.BatchService;
import com.edu.domain.Batch;
import com.edu.repository.BatchRepository;
import com.edu.service.dto.BatchDTO;
import com.edu.service.mapper.BatchMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Batch.
 */
@Service
@Transactional
public class BatchServiceImpl implements BatchService {

    private final Logger log = LoggerFactory.getLogger(BatchServiceImpl.class);

    private final BatchRepository batchRepository;

    private final BatchMapper batchMapper;

    public BatchServiceImpl(BatchRepository batchRepository, BatchMapper batchMapper) {
        this.batchRepository = batchRepository;
        this.batchMapper = batchMapper;
    }

    /**
     * Save a batch.
     *
     * @param batchDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BatchDTO save(BatchDTO batchDTO) {
        log.debug("Request to save Batch : {}", batchDTO);
        Batch batch = batchMapper.toEntity(batchDTO);
        batch = batchRepository.save(batch);
        return batchMapper.toDto(batch);
    }

    /**
     * Get all the batches.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BatchDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Batches");
        return batchRepository.findAll(pageable)
            .map(batchMapper::toDto);
    }

    /**
     * Get one batch by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BatchDTO findOne(Long id) {
        log.debug("Request to get Batch : {}", id);
        Batch batch = batchRepository.findOne(id);
        return batchMapper.toDto(batch);
    }

    /**
     * Delete the batch by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Batch : {}", id);
        batchRepository.delete(id);
    }
}
