package com.edu.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.edu.domain.enumeration.Status;

import com.edu.domain.enumeration.AccountStatus;

/**
 * A Organization.
 */
@Entity
@Table(name = "organization")
public class Organization implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_status")
    private AccountStatus accountStatus;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "mod_date")
    private Instant modDate;

    @OneToMany(mappedBy = "organization")
    @JsonIgnore
    private Set<Division> divisions = new HashSet<>();

    @OneToMany(mappedBy = "organization")
    @JsonIgnore
    private Set<Payment> payments = new HashSet<>();

    @OneToMany(mappedBy = "organization")
    @JsonIgnore
    private Set<Enquiry> enquiries = new HashSet<>();

    @OneToMany(mappedBy = "organization")
    @JsonIgnore
    private Set<Course> courses = new HashSet<>();

    @OneToMany(mappedBy = "organization")
    @JsonIgnore
    private Set<Student> students = new HashSet<>();

    @OneToMany(mappedBy = "organization")
    @JsonIgnore
    private Set<Employee> employees = new HashSet<>();

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

    public Organization name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Status getStatus() {
        return status;
    }

    public Organization status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public AccountStatus getAccountStatus() {
        return accountStatus;
    }

    public Organization accountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
        return this;
    }

    public void setAccountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Organization createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getModDate() {
        return modDate;
    }

    public Organization modDate(Instant modDate) {
        this.modDate = modDate;
        return this;
    }

    public void setModDate(Instant modDate) {
        this.modDate = modDate;
    }

    public Set<Division> getDivisions() {
        return divisions;
    }

    public Organization divisions(Set<Division> divisions) {
        this.divisions = divisions;
        return this;
    }

    public Organization addDivision(Division division) {
        this.divisions.add(division);
        division.setOrganization(this);
        return this;
    }

    public Organization removeDivision(Division division) {
        this.divisions.remove(division);
        division.setOrganization(null);
        return this;
    }

    public void setDivisions(Set<Division> divisions) {
        this.divisions = divisions;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public Organization payments(Set<Payment> payments) {
        this.payments = payments;
        return this;
    }

    public Organization addPayment(Payment payment) {
        this.payments.add(payment);
        payment.setOrganization(this);
        return this;
    }

    public Organization removePayment(Payment payment) {
        this.payments.remove(payment);
        payment.setOrganization(null);
        return this;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    public Set<Enquiry> getEnquiries() {
        return enquiries;
    }

    public Organization enquiries(Set<Enquiry> enquiries) {
        this.enquiries = enquiries;
        return this;
    }

    public Organization addEnquiry(Enquiry enquiry) {
        this.enquiries.add(enquiry);
        enquiry.setOrganization(this);
        return this;
    }

    public Organization removeEnquiry(Enquiry enquiry) {
        this.enquiries.remove(enquiry);
        enquiry.setOrganization(null);
        return this;
    }

    public void setEnquiries(Set<Enquiry> enquiries) {
        this.enquiries = enquiries;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Organization courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Organization addCourse(Course course) {
        this.courses.add(course);
        course.setOrganization(this);
        return this;
    }

    public Organization removeCourse(Course course) {
        this.courses.remove(course);
        course.setOrganization(null);
        return this;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Organization students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Organization addStudent(Student student) {
        this.students.add(student);
        student.setOrganization(this);
        return this;
    }

    public Organization removeStudent(Student student) {
        this.students.remove(student);
        student.setOrganization(null);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public Organization employees(Set<Employee> employees) {
        this.employees = employees;
        return this;
    }

    public Organization addEmployee(Employee employee) {
        this.employees.add(employee);
        employee.setOrganization(this);
        return this;
    }

    public Organization removeEmployee(Employee employee) {
        this.employees.remove(employee);
        employee.setOrganization(null);
        return this;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
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
        Organization organization = (Organization) o;
        if (organization.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), organization.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Organization{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", accountStatus='" + getAccountStatus() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", modDate='" + getModDate() + "'" +
            "}";
    }
}
