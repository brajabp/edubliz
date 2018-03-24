package com.edu.service;

import com.edu.service.dto.FollowUpDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing FollowUp.
 */
public interface FollowUpService {

    /**
     * Save a followUp.
     *
     * @param followUpDTO the entity to save
     * @return the persisted entity
     */
    FollowUpDTO save(FollowUpDTO followUpDTO);

    /**
     * Get all the followUps.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FollowUpDTO> findAll(Pageable pageable);

    /**
     * Get the "id" followUp.
     *
     * @param id the id of the entity
     * @return the entity
     */
    FollowUpDTO findOne(Long id);

    /**
     * Delete the "id" followUp.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
