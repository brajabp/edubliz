package com.edu.service.impl;

import com.edu.service.EnrollService;
import com.edu.domain.Enroll;
import com.edu.repository.EnrollRepository;
import com.edu.service.dto.EnrollDTO;
import com.edu.service.mapper.EnrollMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Enroll.
 */
@Service
@Transactional
public class EnrollServiceImpl implements EnrollService {

    private final Logger log = LoggerFactory.getLogger(EnrollServiceImpl.class);

    private final EnrollRepository enrollRepository;

    private final EnrollMapper enrollMapper;

    public EnrollServiceImpl(EnrollRepository enrollRepository, EnrollMapper enrollMapper) {
        this.enrollRepository = enrollRepository;
        this.enrollMapper = enrollMapper;
    }

    /**
     * Save a enroll.
     *
     * @param enrollDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EnrollDTO save(EnrollDTO enrollDTO) {
        log.debug("Request to save Enroll : {}", enrollDTO);
        Enroll enroll = enrollMapper.toEntity(enrollDTO);
        enroll = enrollRepository.save(enroll);
        return enrollMapper.toDto(enroll);
    }

    /**
     * Get all the enrolls.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EnrollDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Enrolls");
        return enrollRepository.findAll(pageable)
            .map(enrollMapper::toDto);
    }

    /**
     * Get one enroll by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EnrollDTO findOne(Long id) {
        log.debug("Request to get Enroll : {}", id);
        Enroll enroll = enrollRepository.findOne(id);
        return enrollMapper.toDto(enroll);
    }

    /**
     * Delete the enroll by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Enroll : {}", id);
        enrollRepository.delete(id);
    }
}
