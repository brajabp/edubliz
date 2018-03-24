package com.edu.service.mapper;

import com.edu.domain.*;
import com.edu.service.dto.EnquiryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Enquiry and its DTO EnquiryDTO.
 */
@Mapper(componentModel = "spring", uses = {OrganizationMapper.class, StudentMapper.class})
public interface EnquiryMapper extends EntityMapper<EnquiryDTO, Enquiry> {

    @Mapping(source = "organization.id", target = "organizationId")
    @Mapping(source = "student.id", target = "studentId")
    EnquiryDTO toDto(Enquiry enquiry);

    @Mapping(target = "followUps", ignore = true)
    @Mapping(source = "organizationId", target = "organization")
    @Mapping(source = "studentId", target = "student")
    Enquiry toEntity(EnquiryDTO enquiryDTO);

    default Enquiry fromId(Long id) {
        if (id == null) {
            return null;
        }
        Enquiry enquiry = new Enquiry();
        enquiry.setId(id);
        return enquiry;
    }
}
