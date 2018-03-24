package com.edu.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A FollowUp.
 */
@Entity
@Table(name = "follow_up")
public class FollowUp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "follow_up_date")
    private Instant followUpDate;

    @Column(name = "jhi_comment")
    private String comment;

    @ManyToOne
    private Enquiry enquiry;

    @ManyToOne
    private Employee employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFollowUpDate() {
        return followUpDate;
    }

    public FollowUp followUpDate(Instant followUpDate) {
        this.followUpDate = followUpDate;
        return this;
    }

    public void setFollowUpDate(Instant followUpDate) {
        this.followUpDate = followUpDate;
    }

    public String getComment() {
        return comment;
    }

    public FollowUp comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Enquiry getEnquiry() {
        return enquiry;
    }

    public FollowUp enquiry(Enquiry enquiry) {
        this.enquiry = enquiry;
        return this;
    }

    public void setEnquiry(Enquiry enquiry) {
        this.enquiry = enquiry;
    }

    public Employee getEmployee() {
        return employee;
    }

    public FollowUp employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        FollowUp followUp = (FollowUp) o;
        if (followUp.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), followUp.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FollowUp{" +
            "id=" + getId() +
            ", followUpDate='" + getFollowUpDate() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
