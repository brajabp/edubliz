package com.edu.repository;

import com.edu.domain.ClassLog;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ClassLog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClassLogRepository extends JpaRepository<ClassLog, Long> {

}
