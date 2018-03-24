package com.edu.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.edu.domain.enumeration.Status;

/**
 * A DTO for the Schedule entity.
 */
public class ScheduleDTO implements Serializable {

    private Long id;

    private Status status;

    private Instant createDate;

    private Instant modDate;

    private Integer plannedDate;

    private Integer plannedDuration;

    private Long batchId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getModDate() {
        return modDate;
    }

    public void setModDate(Instant modDate) {
        this.modDate = modDate;
    }

    public Integer getPlannedDate() {
        return plannedDate;
    }

    public void setPlannedDate(Integer plannedDate) {
        this.plannedDate = plannedDate;
    }

    public Integer getPlannedDuration() {
        return plannedDuration;
    }

    public void setPlannedDuration(Integer plannedDuration) {
        this.plannedDuration = plannedDuration;
    }

    public Long getBatchId() {
        return batchId;
    }

    public void setBatchId(Long batchId) {
        this.batchId = batchId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ScheduleDTO scheduleDTO = (ScheduleDTO) o;
        if(scheduleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), scheduleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ScheduleDTO{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", modDate='" + getModDate() + "'" +
            ", plannedDate=" + getPlannedDate() +
            ", plannedDuration=" + getPlannedDuration() +
            "}";
    }
}
