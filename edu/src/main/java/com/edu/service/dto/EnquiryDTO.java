package com.edu.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Enquiry entity.
 */
public class EnquiryDTO implements Serializable {

    private Long id;

    private Instant enquiryDate;

    private String comment;

    private String phone;

    private String email;

    private String address;

    private Long organizationId;

    private Long studentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getEnquiryDate() {
        return enquiryDate;
    }

    public void setEnquiryDate(Instant enquiryDate) {
        this.enquiryDate = enquiryDate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Long organizationId) {
        this.organizationId = organizationId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EnquiryDTO enquiryDTO = (EnquiryDTO) o;
        if(enquiryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), enquiryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EnquiryDTO{" +
            "id=" + getId() +
            ", enquiryDate='" + getEnquiryDate() + "'" +
            ", comment='" + getComment() + "'" +
            ", phone='" + getPhone() + "'" +
            ", email='" + getEmail() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
