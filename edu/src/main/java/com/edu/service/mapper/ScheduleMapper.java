package com.edu.service.mapper;

import com.edu.domain.*;
import com.edu.service.dto.ScheduleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Schedule and its DTO ScheduleDTO.
 */
@Mapper(componentModel = "spring", uses = {BatchMapper.class})
public interface ScheduleMapper extends EntityMapper<ScheduleDTO, Schedule> {

    @Mapping(source = "batch.id", target = "batchId")
    ScheduleDTO toDto(Schedule schedule);

    @Mapping(target = "classrooms", ignore = true)
    @Mapping(source = "batchId", target = "batch")
    Schedule toEntity(ScheduleDTO scheduleDTO);

    default Schedule fromId(Long id) {
        if (id == null) {
            return null;
        }
        Schedule schedule = new Schedule();
        schedule.setId(id);
        return schedule;
    }
}
