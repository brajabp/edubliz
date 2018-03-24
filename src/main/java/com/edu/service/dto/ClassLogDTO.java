package com.edu.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.edu.domain.enumeration.Status;
import com.edu.domain.enumeration.LogType;

/**
 * A DTO for the ClassLog entity.
 */
public class ClassLogDTO implements Serializable {

    private Long id;

    private Status status;

    private Instant createDate;

    private Instant modDate;

    private Integer actualDate;

    private Integer actualDuration;

    private Integer sudentPresent;

    private LogType logType;

    private Long classroomId;

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

    public LogType getLogType() {
        return logType;
    }

    public void setLogType(LogType logType) {
        this.logType = logType;
    }

    public Long getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(Long classroomId) {
        this.classroomId = classroomId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClassLogDTO classLogDTO = (ClassLogDTO) o;
        if(classLogDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), classLogDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClassLogDTO{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", modDate='" + getModDate() + "'" +
            ", actualDate=" + getActualDate() +
            ", actualDuration=" + getActualDuration() +
            ", sudentPresent=" + getSudentPresent() +
            ", logType='" + getLogType() + "'" +
            "}";
    }
}
