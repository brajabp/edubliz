package com.edu.service.impl;

import com.edu.service.FollowUpService;
import com.edu.domain.FollowUp;
import com.edu.repository.FollowUpRepository;
import com.edu.service.dto.FollowUpDTO;
import com.edu.service.mapper.FollowUpMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing FollowUp.
 */
@Service
@Transactional
public class FollowUpServiceImpl implements FollowUpService {

    private final Logger log = LoggerFactory.getLogger(FollowUpServiceImpl.class);

    private final FollowUpRepository followUpRepository;

    private final FollowUpMapper followUpMapper;

    public FollowUpServiceImpl(FollowUpRepository followUpRepository, FollowUpMapper followUpMapper) {
        this.followUpRepository = followUpRepository;
        this.followUpMapper = followUpMapper;
    }

    /**
     * Save a followUp.
     *
     * @param followUpDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FollowUpDTO save(FollowUpDTO followUpDTO) {
        log.debug("Request to save FollowUp : {}", followUpDTO);
        FollowUp followUp = followUpMapper.toEntity(followUpDTO);
        followUp = followUpRepository.save(followUp);
        return followUpMapper.toDto(followUp);
    }

    /**
     * Get all the followUps.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FollowUpDTO> findAll(Pageable pageable) {
        log.debug("Request to get all FollowUps");
        return followUpRepository.findAll(pageable)
            .map(followUpMapper::toDto);
    }

    /**
     * Get one followUp by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FollowUpDTO findOne(Long id) {
        log.debug("Request to get FollowUp : {}", id);
        FollowUp followUp = followUpRepository.findOne(id);
        return followUpMapper.toDto(followUp);
    }

    /**
     * Delete the followUp by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FollowUp : {}", id);
        followUpRepository.delete(id);
    }
}
