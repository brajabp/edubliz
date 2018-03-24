package com.edu.service.mapper;

import com.edu.domain.*;
import com.edu.service.dto.DivisionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Division and its DTO DivisionDTO.
 */
@Mapper(componentModel = "spring", uses = {OrganizationMapper.class})
public interface DivisionMapper extends EntityMapper<DivisionDTO, Division> {

    @Mapping(source = "organization.id", target = "organizationId")
    DivisionDTO toDto(Division division);

    @Mapping(source = "organizationId", target = "organization")
    Division toEntity(DivisionDTO divisionDTO);

    default Division fromId(Long id) {
        if (id == null) {
            return null;
        }
        Division division = new Division();
        division.setId(id);
        return division;
    }
}
