package com.edu.service;

import com.edu.service.dto.EnrollDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Enroll.
 */
public interface EnrollService {

    /**
     * Save a enroll.
     *
     * @param enrollDTO the entity to save
     * @return the persisted entity
     */
    EnrollDTO save(EnrollDTO enrollDTO);

    /**
     * Get all the enrolls.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EnrollDTO> findAll(Pageable pageable);

    /**
     * Get the "id" enroll.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EnrollDTO findOne(Long id);

    /**
     * Delete the "id" enroll.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
