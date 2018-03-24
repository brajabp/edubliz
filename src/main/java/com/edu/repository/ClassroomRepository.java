package com.edu.repository;

import com.edu.domain.Classroom;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Classroom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, Long> {

}
