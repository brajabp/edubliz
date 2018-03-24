package com.edu.service;

import com.edu.service.dto.EnquiryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Enquiry.
 */
public interface EnquiryService {

    /**
     * Save a enquiry.
     *
     * @param enquiryDTO the entity to save
     * @return the persisted entity
     */
    EnquiryDTO save(EnquiryDTO enquiryDTO);

    /**
     * Get all the enquiries.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EnquiryDTO> findAll(Pageable pageable);

    /**
     * Get the "id" enquiry.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EnquiryDTO findOne(Long id);

    /**
     * Delete the "id" enquiry.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
