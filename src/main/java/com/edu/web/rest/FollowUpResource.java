package com.edu.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.edu.service.FollowUpService;
import com.edu.web.rest.errors.BadRequestAlertException;
import com.edu.web.rest.util.HeaderUtil;
import com.edu.web.rest.util.PaginationUtil;
import com.edu.service.dto.FollowUpDTO;
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
 * REST controller for managing FollowUp.
 */
@RestController
@RequestMapping("/api")
public class FollowUpResource {

    private final Logger log = LoggerFactory.getLogger(FollowUpResource.class);

    private static final String ENTITY_NAME = "followUp";

    private final FollowUpService followUpService;

    public FollowUpResource(FollowUpService followUpService) {
        this.followUpService = followUpService;
    }

    /**
     * POST  /follow-ups : Create a new followUp.
     *
     * @param followUpDTO the followUpDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new followUpDTO, or with status 400 (Bad Request) if the followUp has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/follow-ups")
    @Timed
    public ResponseEntity<FollowUpDTO> createFollowUp(@RequestBody FollowUpDTO followUpDTO) throws URISyntaxException {
        log.debug("REST request to save FollowUp : {}", followUpDTO);
        if (followUpDTO.getId() != null) {
            throw new BadRequestAlertException("A new followUp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FollowUpDTO result = followUpService.save(followUpDTO);
        return ResponseEntity.created(new URI("/api/follow-ups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /follow-ups : Updates an existing followUp.
     *
     * @param followUpDTO the followUpDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated followUpDTO,
     * or with status 400 (Bad Request) if the followUpDTO is not valid,
     * or with status 500 (Internal Server Error) if the followUpDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/follow-ups")
    @Timed
    public ResponseEntity<FollowUpDTO> updateFollowUp(@RequestBody FollowUpDTO followUpDTO) throws URISyntaxException {
        log.debug("REST request to update FollowUp : {}", followUpDTO);
        if (followUpDTO.getId() == null) {
            return createFollowUp(followUpDTO);
        }
        FollowUpDTO result = followUpService.save(followUpDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, followUpDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /follow-ups : get all the followUps.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of followUps in body
     */
    @GetMapping("/follow-ups")
    @Timed
    public ResponseEntity<List<FollowUpDTO>> getAllFollowUps(Pageable pageable) {
        log.debug("REST request to get a page of FollowUps");
        Page<FollowUpDTO> page = followUpService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/follow-ups");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /follow-ups/:id : get the "id" followUp.
     *
     * @param id the id of the followUpDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the followUpDTO, or with status 404 (Not Found)
     */
    @GetMapping("/follow-ups/{id}")
    @Timed
    public ResponseEntity<FollowUpDTO> getFollowUp(@PathVariable Long id) {
        log.debug("REST request to get FollowUp : {}", id);
        FollowUpDTO followUpDTO = followUpService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(followUpDTO));
    }

    /**
     * DELETE  /follow-ups/:id : delete the "id" followUp.
     *
     * @param id the id of the followUpDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/follow-ups/{id}")
    @Timed
    public ResponseEntity<Void> deleteFollowUp(@PathVariable Long id) {
        log.debug("REST request to delete FollowUp : {}", id);
        followUpService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
