package com.edu.service;

import com.edu.service.dto.DivisionDTO;
import java.util.List;

/**
 * Service Interface for managing Division.
 */
public interface DivisionService {

    /**
     * Save a division.
     *
     * @param divisionDTO the entity to save
     * @return the persisted entity
     */
    DivisionDTO save(DivisionDTO divisionDTO);

    /**
     * Get all the divisions.
     *
     * @return the list of entities
     */
    List<DivisionDTO> findAll();

    /**
     * Get the "id" division.
     *
     * @param id the id of the entity
     * @return the entity
     */
    DivisionDTO findOne(Long id);

    /**
     * Delete the "id" division.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
