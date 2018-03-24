package com.edu.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the FollowUp entity.
 */
public class FollowUpDTO implements Serializable {

    private Long id;

    private Instant followUpDate;

    private String comment;

    private Long enquiryId;

    private Long employeeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFollowUpDate() {
        return followUpDate;
    }

    public void setFollowUpDate(Instant followUpDate) {
        this.followUpDate = followUpDate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getEnquiryId() {
        return enquiryId;
    }

    public void setEnquiryId(Long enquiryId) {
        this.enquiryId = enquiryId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FollowUpDTO followUpDTO = (FollowUpDTO) o;
        if(followUpDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), followUpDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FollowUpDTO{" +
            "id=" + getId() +
            ", followUpDate='" + getFollowUpDate() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
