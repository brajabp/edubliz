package com.edu.service.impl;

import com.edu.service.EnquiryService;
import com.edu.domain.Enquiry;
import com.edu.repository.EnquiryRepository;
import com.edu.service.dto.EnquiryDTO;
import com.edu.service.mapper.EnquiryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Enquiry.
 */
@Service
@Transactional
public class EnquiryServiceImpl implements EnquiryService {

    private final Logger log = LoggerFactory.getLogger(EnquiryServiceImpl.class);

    private final EnquiryRepository enquiryRepository;

    private final EnquiryMapper enquiryMapper;

    public EnquiryServiceImpl(EnquiryRepository enquiryRepository, EnquiryMapper enquiryMapper) {
        this.enquiryRepository = enquiryRepository;
        this.enquiryMapper = enquiryMapper;
    }

    /**
     * Save a enquiry.
     *
     * @param enquiryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EnquiryDTO save(EnquiryDTO enquiryDTO) {
        log.debug("Request to save Enquiry : {}", enquiryDTO);
        Enquiry enquiry = enquiryMapper.toEntity(enquiryDTO);
        enquiry = enquiryRepository.save(enquiry);
        return enquiryMapper.toDto(enquiry);
    }

    /**
     * Get all the enquiries.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EnquiryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Enquiries");
        return enquiryRepository.findAll(pageable)
            .map(enquiryMapper::toDto);
    }

    /**
     * Get one enquiry by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EnquiryDTO findOne(Long id) {
        log.debug("Request to get Enquiry : {}", id);
        Enquiry enquiry = enquiryRepository.findOne(id);
        return enquiryMapper.toDto(enquiry);
    }

    /**
     * Delete the enquiry by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Enquiry : {}", id);
        enquiryRepository.delete(id);
    }
}
