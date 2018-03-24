package com.edu.service.impl;

import com.edu.service.ClassLogService;
import com.edu.domain.ClassLog;
import com.edu.repository.ClassLogRepository;
import com.edu.service.dto.ClassLogDTO;
import com.edu.service.mapper.ClassLogMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing ClassLog.
 */
@Service
@Transactional
public class ClassLogServiceImpl implements ClassLogService {

    private final Logger log = LoggerFactory.getLogger(ClassLogServiceImpl.class);

    private final ClassLogRepository classLogRepository;

    private final ClassLogMapper classLogMapper;

    public ClassLogServiceImpl(ClassLogRepository classLogRepository, ClassLogMapper classLogMapper) {
        this.classLogRepository = classLogRepository;
        this.classLogMapper = classLogMapper;
    }

    /**
     * Save a classLog.
     *
     * @param classLogDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ClassLogDTO save(ClassLogDTO classLogDTO) {
        log.debug("Request to save ClassLog : {}", classLogDTO);
        ClassLog classLog = classLogMapper.toEntity(classLogDTO);
        classLog = classLogRepository.save(classLog);
        return classLogMapper.toDto(classLog);
    }

    /**
     * Get all the classLogs.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ClassLogDTO> findAll() {
        log.debug("Request to get all ClassLogs");
        return classLogRepository.findAll().stream()
            .map(classLogMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one classLog by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ClassLogDTO findOne(Long id) {
        log.debug("Request to get ClassLog : {}", id);
        ClassLog classLog = classLogRepository.findOne(id);
        return classLogMapper.toDto(classLog);
    }

    /**
     * Delete the classLog by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ClassLog : {}", id);
        classLogRepository.delete(id);
    }
}
