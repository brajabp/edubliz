package com.edu.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.edu.domain.enumeration.Status;

/**
 * A DTO for the Classroom entity.
 */
public class ClassroomDTO implements Serializable {

    private Long id;

    private Status status;

    private Instant createDate;

    private Instant modDate;

    private Integer actualDate;

    private Integer actualDuration;

    private Integer sudentPresent;

    private Long scheduleId;

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

    public Integer getActualDate() {
        return actualDate;
    }

    public void setActualDate(Integer actualDate) {
        this.actualDate = actualDate;
    }

    public Integer getActualDuration() {
        return actualDuration;
    }

    public void setActualDuration(Integer actualDuration) {
        this.actualDuration = actualDuration;
    }

    public Integer getSudentPresent() {
        return sudentPresent;
    }

    public void setSudentPresent(Integer sudentPresent) {
        this.sudentPresent = sudentPresent;
    }

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClassroomDTO classroomDTO = (ClassroomDTO) o;
        if(classroomDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), classroomDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClassroomDTO{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", modDate='" + getModDate() + "'" +
            ", actualDate=" + getActualDate() +
            ", actualDuration=" + getActualDuration() +
            ", sudentPresent=" + getSudentPresent() +
            "}";
    }
}
