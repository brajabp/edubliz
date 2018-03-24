package com.edu.service.mapper;

import com.edu.domain.*;
import com.edu.service.dto.EmployeeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Employee and its DTO EmployeeDTO.
 */
@Mapper(componentModel = "spring", uses = {OrganizationMapper.class})
public interface EmployeeMapper extends EntityMapper<EmployeeDTO, Employee> {

    @Mapping(source = "organization.id", target = "organizationId")
    EmployeeDTO toDto(Employee employee);

    @Mapping(target = "batches", ignore = true)
    @Mapping(target = "followUps", ignore = true)
    @Mapping(source = "organizationId", target = "organization")
    Employee toEntity(EmployeeDTO employeeDTO);

    default Employee fromId(Long id) {
        if (id == null) {
            return null;
        }
        Employee employee = new Employee();
        employee.setId(id);
        return employee;
    }
}
