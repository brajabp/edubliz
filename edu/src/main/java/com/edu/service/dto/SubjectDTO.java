package com.edu.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.edu.domain.enumeration.Status;

/**
 * A DTO for the Subject entity.
 */
public class SubjectDTO implements Serializable {

    private Long id;

    private String name;

    private Status status;

    private Instant createDate;

    private Instant modDate;

    private Long fee;

    private Integer durationYear;

    private Integer durationMonth;

    private Integer durationDay;

    private Long courseId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Long getFee() {
        return fee;
    }

    public void setFee(Long fee) {
        this.fee = fee;
    }

    public Integer getDurationYear() {
        return durationYear;
    }

    public void setDurationYear(Integer durationYear) {
        this.durationYear = durationYear;
    }

    public Integer getDurationMonth() {
        return durationMonth;
    }

    public void setDurationMonth(Integer durationMonth) {
        this.durationMonth = durationMonth;
    }

    public Integer getDurationDay() {
        return durationDay;
    }

    public void setDurationDay(Integer durationDay) {
        this.durationDay = durationDay;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SubjectDTO subjectDTO = (SubjectDTO) o;
        if(subjectDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subjectDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubjectDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", modDate='" + getModDate() + "'" +
            ", fee=" + getFee() +
            ", durationYear=" + getDurationYear() +
            ", durationMonth=" + getDurationMonth() +
            ", durationDay=" + getDurationDay() +
            "}";
    }
}
