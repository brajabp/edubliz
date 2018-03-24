package com.edu.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.edu.service.ClassLogService;
import com.edu.web.rest.errors.BadRequestAlertException;
import com.edu.web.rest.util.HeaderUtil;
import com.edu.service.dto.ClassLogDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ClassLog.
 */
@RestController
@RequestMapping("/api")
public class ClassLogResource {

    private final Logger log = LoggerFactory.getLogger(ClassLogResource.class);

    private static final String ENTITY_NAME = "classLog";

    private final ClassLogService classLogService;

    public ClassLogResource(ClassLogService classLogService) {
        this.classLogService = classLogService;
    }

    /**
     * POST  /class-logs : Create a new classLog.
     *
     * @param classLogDTO the classLogDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new classLogDTO, or with status 400 (Bad Request) if the classLog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/class-logs")
    @Timed
    public ResponseEntity<ClassLogDTO> createClassLog(@RequestBody ClassLogDTO classLogDTO) throws URISyntaxException {
        log.debug("REST request to save ClassLog : {}", classLogDTO);
        if (classLogDTO.getId() != null) {
            throw new BadRequestAlertException("A new classLog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClassLogDTO result = classLogService.save(classLogDTO);
        return ResponseEntity.created(new URI("/api/class-logs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /class-logs : Updates an existing classLog.
     *
     * @param classLogDTO the classLogDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated classLogDTO,
     * or with status 400 (Bad Request) if the classLogDTO is not valid,
     * or with status 500 (Internal Server Error) if the classLogDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/class-logs")
    @Timed
    public ResponseEntity<ClassLogDTO> updateClassLog(@RequestBody ClassLogDTO classLogDTO) throws URISyntaxException {
        log.debug("REST request to update ClassLog : {}", classLogDTO);
        if (classLogDTO.getId() == null) {
            return createClassLog(classLogDTO);
        }
        ClassLogDTO result = classLogService.save(classLogDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, classLogDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /class-logs : get all the classLogs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of classLogs in body
     */
    @GetMapping("/class-logs")
    @Timed
    public List<ClassLogDTO> getAllClassLogs() {
        log.debug("REST request to get all ClassLogs");
        return classLogService.findAll();
        }

    /**
     * GET  /class-logs/:id : get the "id" classLog.
     *
     * @param id the id of the classLogDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the classLogDTO, or with status 404 (Not Found)
     */
    @GetMapping("/class-logs/{id}")
    @Timed
    public ResponseEntity<ClassLogDTO> getClassLog(@PathVariable Long id) {
        log.debug("REST request to get ClassLog : {}", id);
        ClassLogDTO classLogDTO = classLogService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(classLogDTO));
    }

    /**
     * DELETE  /class-logs/:id : delete the "id" classLog.
     *
     * @param id the id of the classLogDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/class-logs/{id}")
    @Timed
    public ResponseEntity<Void> deleteClassLog(@PathVariable Long id) {
        log.debug("REST request to delete ClassLog : {}", id);
        classLogService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
