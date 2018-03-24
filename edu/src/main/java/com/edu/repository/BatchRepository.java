package com.edu.repository;

import com.edu.domain.Batch;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Batch entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {

}
