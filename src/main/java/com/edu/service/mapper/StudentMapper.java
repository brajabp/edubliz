package com.edu.service.mapper;

import com.edu.domain.*;
import com.edu.service.dto.StudentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Student and its DTO StudentDTO.
 */
@Mapper(componentModel = "spring", uses = {OrganizationMapper.class})
public interface StudentMapper extends EntityMapper<StudentDTO, Student> {

    @Mapping(source = "organization.id", target = "organizationId")
    StudentDTO toDto(Student student);

    @Mapping(target = "enrolls", ignore = true)
    @Mapping(target = "batches", ignore = true)
    @Mapping(target = "enquiries", ignore = true)
    @Mapping(source = "organizationId", target = "organization")
    Student toEntity(StudentDTO studentDTO);

    default Student fromId(Long id) {
        if (id == null) {
            return null;
        }
        Student student = new Student();
        student.setId(id);
        return student;
    }
}
