package com.edu.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.edu.service.EnrollService;
import com.edu.web.rest.errors.BadRequestAlertException;
import com.edu.web.rest.util.HeaderUtil;
import com.edu.web.rest.util.PaginationUtil;
import com.edu.service.dto.EnrollDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Enroll.
 */
@RestController
@RequestMapping("/api")
public class EnrollResource {

    private final Logger log = LoggerFactory.getLogger(EnrollResource.class);

    private static final String ENTITY_NAME = "enroll";

    private final EnrollService enrollService;

    public EnrollResource(EnrollService enrollService) {
        this.enrollService = enrollService;
    }

    /**
     * POST  /enrolls : Create a new enroll.
     *
     * @param enrollDTO the enrollDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new enrollDTO, or with status 400 (Bad Request) if the enroll has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/enrolls")
    @Timed
    public ResponseEntity<EnrollDTO> createEnroll(@RequestBody EnrollDTO enrollDTO) throws URISyntaxException {
        log.debug("REST request to save Enroll : {}", enrollDTO);
        if (enrollDTO.getId() != null) {
            throw new BadRequestAlertException("A new enroll cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EnrollDTO result = enrollService.save(enrollDTO);
        return ResponseEntity.created(new URI("/api/enrolls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /enrolls : Updates an existing enroll.
     *
     * @param enrollDTO the enrollDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated enrollDTO,
     * or with status 400 (Bad Request) if the enrollDTO is not valid,
     * or with status 500 (Internal Server Error) if the enrollDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/enrolls")
    @Timed
    public ResponseEntity<EnrollDTO> updateEnroll(@RequestBody EnrollDTO enrollDTO) throws URISyntaxException {
        log.debug("REST request to update Enroll : {}", enrollDTO);
        if (enrollDTO.getId() == null) {
            return createEnroll(enrollDTO);
        }
        EnrollDTO result = enrollService.save(enrollDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, enrollDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /enrolls : get all the enrolls.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of enrolls in body
     */
    @GetMapping("/enrolls")
    @Timed
    public ResponseEntity<List<EnrollDTO>> getAllEnrolls(Pageable pageable) {
        log.debug("REST request to get a page of Enrolls");
        Page<EnrollDTO> page = enrollService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/enrolls");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /enrolls/:id : get the "id" enroll.
     *
     * @param id the id of the enrollDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the enrollDTO, or with status 404 (Not Found)
     */
    @GetMapping("/enrolls/{id}")
    @Timed
    public ResponseEntity<EnrollDTO> getEnroll(@PathVariable Long id) {
        log.debug("REST request to get Enroll : {}", id);
        EnrollDTO enrollDTO = enrollService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(enrollDTO));
    }

    /**
     * DELETE  /enrolls/:id : delete the "id" enroll.
     *
     * @param id the id of the enrollDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/enrolls/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnroll(@PathVariable Long id) {
        log.debug("REST request to delete Enroll : {}", id);
        enrollService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
