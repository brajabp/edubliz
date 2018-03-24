package com.edu.service;

import com.edu.service.dto.BatchDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Batch.
 */
public interface BatchService {

    /**
     * Save a batch.
     *
     * @param batchDTO the entity to save
     * @return the persisted entity
     */
    BatchDTO save(BatchDTO batchDTO);

    /**
     * Get all the batches.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BatchDTO> findAll(Pageable pageable);

    /**
     * Get the "id" batch.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BatchDTO findOne(Long id);

    /**
     * Delete the "id" batch.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
