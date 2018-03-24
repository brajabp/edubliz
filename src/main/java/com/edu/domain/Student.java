package com.edu.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.edu.domain.enumeration.Status;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "mod_date")
    private Instant modDate;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private Set<Enroll> enrolls = new HashSet<>();

    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private Set<Batch> batches = new HashSet<>();

    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private Set<Enquiry> enquiries = new HashSet<>();

    @ManyToOne
    private Organization organization;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Student name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Status getStatus() {
        return status;
    }

    public Student status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Student createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getModDate() {
        return modDate;
    }

    public Student modDate(Instant modDate) {
        this.modDate = modDate;
        return this;
    }

    public void setModDate(Instant modDate) {
        this.modDate = modDate;
    }

    public String getPhone() {
        return phone;
    }

    public Student phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public Student email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public Student address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Enroll> getEnrolls() {
        return enrolls;
    }

    public Student enrolls(Set<Enroll> enrolls) {
        this.enrolls = enrolls;
        return this;
    }

    public Student addEnroll(Enroll enroll) {
        this.enrolls.add(enroll);
        enroll.setStudent(this);
        return this;
    }

    public Student removeEnroll(Enroll enroll) {
        this.enrolls.remove(enroll);
        enroll.setStudent(null);
        return this;
    }

    public void setEnrolls(Set<Enroll> enrolls) {
        this.enrolls = enrolls;
    }

    public Set<Batch> getBatches() {
        return batches;
    }

    public Student batches(Set<Batch> batches) {
        this.batches = batches;
        return this;
    }

    public Student addBatch(Batch batch) {
        this.batches.add(batch);
        batch.setStudent(this);
        return this;
    }

    public Student removeBatch(Batch batch) {
        this.batches.remove(batch);
        batch.setStudent(null);
        return this;
    }

    public void setBatches(Set<Batch> batches) {
        this.batches = batches;
    }

    public Set<Enquiry> getEnquiries() {
        return enquiries;
    }

    public Student enquiries(Set<Enquiry> enquiries) {
        this.enquiries = enquiries;
        return this;
    }

    public Student addEnquiry(Enquiry enquiry) {
        this.enquiries.add(enquiry);
        enquiry.setStudent(this);
        return this;
    }

    public Student removeEnquiry(Enquiry enquiry) {
        this.enquiries.remove(enquiry);
        enquiry.setStudent(null);
        return this;
    }

    public void setEnquiries(Set<Enquiry> enquiries) {
        this.enquiries = enquiries;
    }

    public Organization getOrganization() {
        return organization;
    }

    public Student organization(Organization organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
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
        Student student = (Student) o;
        if (student.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), student.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", modDate='" + getModDate() + "'" +
            ", phone='" + getPhone() + "'" +
            ", email='" + getEmail() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
