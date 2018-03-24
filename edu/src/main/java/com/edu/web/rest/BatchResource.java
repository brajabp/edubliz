package com.edu.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.edu.service.BatchService;
import com.edu.web.rest.errors.BadRequestAlertException;
import com.edu.web.rest.util.HeaderUtil;
import com.edu.web.rest.util.PaginationUtil;
import com.edu.service.dto.BatchDTO;
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
 * REST controller for managing Batch.
 */
@RestController
@RequestMapping("/api")
public class BatchResource {

    private final Logger log = LoggerFactory.getLogger(BatchResource.class);

    private static final String ENTITY_NAME = "batch";

    private final BatchService batchService;

    public BatchResource(BatchService batchService) {
        this.batchService = batchService;
    }

    /**
     * POST  /batches : Create a new batch.
     *
     * @param batchDTO the batchDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new batchDTO, or with status 400 (Bad Request) if the batch has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/batches")
    @Timed
    public ResponseEntity<BatchDTO> createBatch(@RequestBody BatchDTO batchDTO) throws URISyntaxException {
        log.debug("REST request to save Batch : {}", batchDTO);
        if (batchDTO.getId() != null) {
            throw new BadRequestAlertException("A new batch cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BatchDTO result = batchService.save(batchDTO);
        return ResponseEntity.created(new URI("/api/batches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /batches : Updates an existing batch.
     *
     * @param batchDTO the batchDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated batchDTO,
     * or with status 400 (Bad Request) if the batchDTO is not valid,
     * or with status 500 (Internal Server Error) if the batchDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/batches")
    @Timed
    public ResponseEntity<BatchDTO> updateBatch(@RequestBody BatchDTO batchDTO) throws URISyntaxException {
        log.debug("REST request to update Batch : {}", batchDTO);
        if (batchDTO.getId() == null) {
            return createBatch(batchDTO);
        }
        BatchDTO result = batchService.save(batchDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, batchDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /batches : get all the batches.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of batches in body
     */
    @GetMapping("/batches")
    @Timed
    public ResponseEntity<List<BatchDTO>> getAllBatches(Pageable pageable) {
        log.debug("REST request to get a page of Batches");
        Page<BatchDTO> page = batchService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/batches");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /batches/:id : get the "id" batch.
     *
     * @param id the id of the batchDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the batchDTO, or with status 404 (Not Found)
     */
    @GetMapping("/batches/{id}")
    @Timed
    public ResponseEntity<BatchDTO> getBatch(@PathVariable Long id) {
        log.debug("REST request to get Batch : {}", id);
        BatchDTO batchDTO = batchService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(batchDTO));
    }

    /**
     * DELETE  /batches/:id : delete the "id" batch.
     *
     * @param id the id of the batchDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/batches/{id}")
    @Timed
    public ResponseEntity<Void> deleteBatch(@PathVariable Long id) {
        log.debug("REST request to delete Batch : {}", id);
        batchService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
