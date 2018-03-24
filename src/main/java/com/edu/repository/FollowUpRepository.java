package com.edu.repository;

import com.edu.domain.FollowUp;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FollowUp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FollowUpRepository extends JpaRepository<FollowUp, Long> {

}
