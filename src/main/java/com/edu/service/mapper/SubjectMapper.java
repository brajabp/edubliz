package com.edu.service.mapper;

import com.edu.domain.*;
import com.edu.service.dto.SubjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Subject and its DTO SubjectDTO.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class})
public interface SubjectMapper extends EntityMapper<SubjectDTO, Subject> {

    @Mapping(source = "course.id", target = "courseId")
    SubjectDTO toDto(Subject subject);

    @Mapping(target = "batches", ignore = true)
    @Mapping(source = "courseId", target = "course")
    Subject toEntity(SubjectDTO subjectDTO);

    default Subject fromId(Long id) {
        if (id == null) {
            return null;
        }
        Subject subject = new Subject();
        subject.setId(id);
        return subject;
    }
}
