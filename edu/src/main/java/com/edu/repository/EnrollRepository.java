package com.edu.repository;

import com.edu.domain.Enroll;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Enroll entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnrollRepository extends JpaRepository<Enroll, Long> {

}
