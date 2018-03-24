package com.edu.repository;

import com.edu.domain.Enquiry;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Enquiry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

}
