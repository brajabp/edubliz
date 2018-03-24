package com.edu.service.mapper;

import com.edu.domain.*;
import com.edu.service.dto.FollowUpDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FollowUp and its DTO FollowUpDTO.
 */
@Mapper(componentModel = "spring", uses = {EnquiryMapper.class, EmployeeMapper.class})
public interface FollowUpMapper extends EntityMapper<FollowUpDTO, FollowUp> {

    @Mapping(source = "enquiry.id", target = "enquiryId")
    @Mapping(source = "employee.id", target = "employeeId")
    FollowUpDTO toDto(FollowUp followUp);

    @Mapping(source = "enquiryId", target = "enquiry")
    @Mapping(source = "employeeId", target = "employee")
    FollowUp toEntity(FollowUpDTO followUpDTO);

    default FollowUp fromId(Long id) {
        if (id == null) {
            return null;
        }
        FollowUp followUp = new FollowUp();
        followUp.setId(id);
        return followUp;
    }
}
