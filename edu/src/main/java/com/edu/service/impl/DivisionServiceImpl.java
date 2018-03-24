package com.edu.service.impl;

import com.edu.service.DivisionService;
import com.edu.domain.Division;
import com.edu.repository.DivisionRepository;
import com.edu.service.dto.DivisionDTO;
import com.edu.service.mapper.DivisionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Division.
 */
@Service
@Transactional
public class DivisionServiceImpl implements DivisionService {

    private final Logger log = LoggerFactory.getLogger(DivisionServiceImpl.class);

    private final DivisionRepository divisionRepository;

    private final DivisionMapper divisionMapper;

    public DivisionServiceImpl(DivisionRepository divisionRepository, DivisionMapper divisionMapper) {
        this.divisionRepository = divisionRepository;
        this.divisionMapper = divisionMapper;
    }

    /**
     * Save a division.
     *
     * @param divisionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DivisionDTO save(DivisionDTO divisionDTO) {
        log.debug("Request to save Division : {}", divisionDTO);
        Division division = divisionMapper.toEntity(divisionDTO);
        division = divisionRepository.save(division);
        return divisionMapper.toDto(division);
    }

    /**
     * Get all the divisions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DivisionDTO> findAll() {
        log.debug("Request to get all Divisions");
        return divisionRepository.findAll().stream()
            .map(divisionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one division by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DivisionDTO findOne(Long id) {
        log.debug("Request to get Division : {}", id);
        Division division = divisionRepository.findOne(id);
        return divisionMapper.toDto(division);
    }

    /**
     * Delete the division by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Division : {}", id);
        divisionRepository.delete(id);
    }
}
