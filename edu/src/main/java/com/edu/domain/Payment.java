package com.edu.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.edu.domain.enumeration.Status;

/**
 * A Payment.
 */
@Entity
@Table(name = "payment")
public class Payment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "mod_date")
    private Instant modDate;

    @ManyToOne
    private Organization organization;

    @ManyToOne
    private Enroll enroll;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public Payment status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getAmount() {
        return amount;
    }

    public Payment amount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Payment createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getModDate() {
        return modDate;
    }

    public Payment modDate(Instant modDate) {
        this.modDate = modDate;
        return this;
    }

    public void setModDate(Instant modDate) {
        this.modDate = modDate;
    }

    public Organization getOrganization() {
        return organization;
    }

    public Payment organization(Organization organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Enroll getEnroll() {
        return enroll;
    }

    public Payment enroll(Enroll enroll) {
        this.enroll = enroll;
        return this;
    }

    public void setEnroll(Enroll enroll) {
        this.enroll = enroll;
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
        Payment payment = (Payment) o;
        if (payment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), payment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Payment{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", amount=" + getAmount() +
            ", createDate='" + getCreateDate() + "'" +
            ", modDate='" + getModDate() + "'" +
            "}";
    }
}
