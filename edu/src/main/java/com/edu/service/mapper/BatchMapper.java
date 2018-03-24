package com.edu.service.mapper;

import com.edu.domain.*;
import com.edu.service.dto.BatchDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Batch and its DTO BatchDTO.
 */
@Mapper(componentModel = "spring", uses = {SubjectMapper.class, StudentMapper.class, EmployeeMapper.class})
public interface BatchMapper extends EntityMapper<BatchDTO, Batch> {

    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "employee.id", target = "employeeId")
    BatchDTO toDto(Batch batch);

    @Mapping(target = "schedules", ignore = true)
    @Mapping(target = "enrolls", ignore = true)
    @Mapping(source = "subjectId", target = "subject")
    @Mapping(source = "studentId", target = "student")
    @Mapping(source = "employeeId", target = "employee")
    Batch toEntity(BatchDTO batchDTO);

    default Batch fromId(Long id) {
        if (id == null) {
            return null;
        }
        Batch batch = new Batch();
        batch.setId(id);
        return batch;
    }
}
