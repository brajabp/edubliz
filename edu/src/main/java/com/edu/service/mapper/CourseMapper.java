package com.edu.service.mapper;

import com.edu.domain.*;
import com.edu.service.dto.CourseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Course and its DTO CourseDTO.
 */
@Mapper(componentModel = "spring", uses = {OrganizationMapper.class})
public interface CourseMapper extends EntityMapper<CourseDTO, Course> {

    @Mapping(source = "organization.id", target = "organizationId")
    CourseDTO toDto(Course course);

    @Mapping(target = "enrolls", ignore = true)
    @Mapping(target = "subjects", ignore = true)
    @Mapping(source = "organizationId", target = "organization")
    Course toEntity(CourseDTO courseDTO);

    default Course fromId(Long id) {
        if (id == null) {
            return null;
        }
        Course course = new Course();
        course.setId(id);
        return course;
    }
}
