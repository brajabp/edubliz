package com.edu.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.edu.service.EnquiryService;
import com.edu.web.rest.errors.BadRequestAlertException;
import com.edu.web.rest.util.HeaderUtil;
import com.edu.web.rest.util.PaginationUtil;
import com.edu.service.dto.EnquiryDTO;
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
 * REST controller for managing Enquiry.
 */
@RestController
@RequestMapping("/api")
public class EnquiryResource {

    private final Logger log = LoggerFactory.getLogger(EnquiryResource.class);

    private static final String ENTITY_NAME = "enquiry";

    private final EnquiryService enquiryService;

    public EnquiryResource(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    /**
     * POST  /enquiries : Create a new enquiry.
     *
     * @param enquiryDTO the enquiryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new enquiryDTO, or with status 400 (Bad Request) if the enquiry has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/enquiries")
    @Timed
    public ResponseEntity<EnquiryDTO> createEnquiry(@RequestBody EnquiryDTO enquiryDTO) throws URISyntaxException {
        log.debug("REST request to save Enquiry : {}", enquiryDTO);
        if (enquiryDTO.getId() != null) {
            throw new BadRequestAlertException("A new enquiry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EnquiryDTO result = enquiryService.save(enquiryDTO);
        return ResponseEntity.created(new URI("/api/enquiries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /enquiries : Updates an existing enquiry.
     *
     * @param enquiryDTO the enquiryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated enquiryDTO,
     * or with status 400 (Bad Request) if the enquiryDTO is not valid,
     * or with status 500 (Internal Server Error) if the enquiryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/enquiries")
    @Timed
    public ResponseEntity<EnquiryDTO> updateEnquiry(@RequestBody EnquiryDTO enquiryDTO) throws URISyntaxException {
        log.debug("REST request to update Enquiry : {}", enquiryDTO);
        if (enquiryDTO.getId() == null) {
            return createEnquiry(enquiryDTO);
        }
        EnquiryDTO result = enquiryService.save(enquiryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, enquiryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /enquiries : get all the enquiries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of enquiries in body
     */
    @GetMapping("/enquiries")
    @Timed
    public ResponseEntity<List<EnquiryDTO>> getAllEnquiries(Pageable pageable) {
        log.debug("REST request to get a page of Enquiries");
        Page<EnquiryDTO> page = enquiryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/enquiries");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /enquiries/:id : get the "id" enquiry.
     *
     * @param id the id of the enquiryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the enquiryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/enquiries/{id}")
    @Timed
    public ResponseEntity<EnquiryDTO> getEnquiry(@PathVariable Long id) {
        log.debug("REST request to get Enquiry : {}", id);
        EnquiryDTO enquiryDTO = enquiryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(enquiryDTO));
    }

    /**
     * DELETE  /enquiries/:id : delete the "id" enquiry.
     *
     * @param id the id of the enquiryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/enquiries/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnquiry(@PathVariable Long id) {
        log.debug("REST request to delete Enquiry : {}", id);
        enquiryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
