package com.edu.service;

import com.edu.service.dto.ClassLogDTO;
import java.util.List;

/**
 * Service Interface for managing ClassLog.
 */
public interface ClassLogService {

    /**
     * Save a classLog.
     *
     * @param classLogDTO the entity to save
     * @return the persisted entity
     */
    ClassLogDTO save(ClassLogDTO classLogDTO);

    /**
     * Get all the classLogs.
     *
     * @return the list of entities
     */
    List<ClassLogDTO> findAll();

    /**
     * Get the "id" classLog.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ClassLogDTO findOne(Long id);

    /**
     * Delete the "id" classLog.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
