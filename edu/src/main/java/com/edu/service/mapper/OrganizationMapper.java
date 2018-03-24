package com.edu.service.mapper;

import com.edu.domain.*;
import com.edu.service.dto.OrganizationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Organization and its DTO OrganizationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OrganizationMapper extends EntityMapper<OrganizationDTO, Organization> {


    @Mapping(target = "divisions", ignore = true)
    @Mapping(target = "payments", ignore = true)
    @Mapping(target = "enquiries", ignore = true)
    @Mapping(target = "courses", ignore = true)
    @Mapping(target = "students", ignore = true)
    @Mapping(target = "employees", ignore = true)
    Organization toEntity(OrganizationDTO organizationDTO);

    default Organization fromId(Long id) {
        if (id == null) {
            return null;
        }
        Organization organization = new Organization();
        organization.setId(id);
        return organization;
    }
}
