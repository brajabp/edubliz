package com.edu.service.mapper;

import com.edu.domain.*;
import com.edu.service.dto.EnrollDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Enroll and its DTO EnrollDTO.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class, StudentMapper.class, BatchMapper.class})
public interface EnrollMapper extends EntityMapper<EnrollDTO, Enroll> {

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "batch.id", target = "batchId")
    EnrollDTO toDto(Enroll enroll);

    @Mapping(target = "payments", ignore = true)
    @Mapping(source = "courseId", target = "course")
    @Mapping(source = "studentId", target = "student")
    @Mapping(source = "batchId", target = "batch")
    Enroll toEntity(EnrollDTO enrollDTO);

    default Enroll fromId(Long id) {
        if (id == null) {
            return null;
        }
        Enroll enroll = new Enroll();
        enroll.setId(id);
        return enroll;
    }
}
