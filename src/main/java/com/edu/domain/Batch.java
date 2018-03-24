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
 * A Batch.
 */
@Entity
@Table(name = "batch")
public class Batch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "mod_date")
    private Instant modDate;

    @Column(name = "start_date")
    private Integer startDate;

    @Column(name = "end_date")
    private Integer endDate;

    @Column(name = "sudent_capacity")
    private Integer sudentCapacity;

    @OneToMany(mappedBy = "batch")
    @JsonIgnore
    private Set<Schedule> schedules = new HashSet<>();

    @OneToMany(mappedBy = "batch")
    @JsonIgnore
    private Set<Enroll> enrolls = new HashSet<>();

    @ManyToOne
    private Subject subject;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Employee employee;

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

    public Batch status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Batch createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getModDate() {
        return modDate;
    }

    public Batch modDate(Instant modDate) {
        this.modDate = modDate;
        return this;
    }

    public void setModDate(Instant modDate) {
        this.modDate = modDate;
    }

    public Integer getStartDate() {
        return startDate;
    }

    public Batch startDate(Integer startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Integer startDate) {
        this.startDate = startDate;
    }

    public Integer getEndDate() {
        return endDate;
    }

    public Batch endDate(Integer endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Integer endDate) {
        this.endDate = endDate;
    }

    public Integer getSudentCapacity() {
        return sudentCapacity;
    }

    public Batch sudentCapacity(Integer sudentCapacity) {
        this.sudentCapacity = sudentCapacity;
        return this;
    }

    public void setSudentCapacity(Integer sudentCapacity) {
        this.sudentCapacity = sudentCapacity;
    }

    public Set<Schedule> getSchedules() {
        return schedules;
    }

    public Batch schedules(Set<Schedule> schedules) {
        this.schedules = schedules;
        return this;
    }

    public Batch addSchedule(Schedule schedule) {
        this.schedules.add(schedule);
        schedule.setBatch(this);
        return this;
    }

    public Batch removeSchedule(Schedule schedule) {
        this.schedules.remove(schedule);
        schedule.setBatch(null);
        return this;
    }

    public void setSchedules(Set<Schedule> schedules) {
        this.schedules = schedules;
    }

    public Set<Enroll> getEnrolls() {
        return enrolls;
    }

    public Batch enrolls(Set<Enroll> enrolls) {
        this.enrolls = enrolls;
        return this;
    }

    public Batch addEnroll(Enroll enroll) {
        this.enrolls.add(enroll);
        enroll.setBatch(this);
        return this;
    }

    public Batch removeEnroll(Enroll enroll) {
        this.enrolls.remove(enroll);
        enroll.setBatch(null);
        return this;
    }

    public void setEnrolls(Set<Enroll> enrolls) {
        this.enrolls = enrolls;
    }

    public Subject getSubject() {
        return subject;
    }

    public Batch subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Student getStudent() {
        return student;
    }

    public Batch student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Batch employee(Employee employee) {
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
        Batch batch = (Batch) o;
        if (batch.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), batch.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Batch{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", modDate='" + getModDate() + "'" +
            ", startDate=" + getStartDate() +
            ", endDate=" + getEndDate() +
            ", sudentCapacity=" + getSudentCapacity() +
            "}";
    }
}
