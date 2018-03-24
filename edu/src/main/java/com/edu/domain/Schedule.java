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
 * A Schedule.
 */
@Entity
@Table(name = "schedule")
public class Schedule implements Serializable {

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

    @Column(name = "planned_date")
    private Integer plannedDate;

    @Column(name = "planned_duration")
    private Integer plannedDuration;

    @OneToMany(mappedBy = "schedule")
    @JsonIgnore
    private Set<Classroom> classrooms = new HashSet<>();

    @ManyToOne
    private Batch batch;

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

    public Schedule status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Schedule createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getModDate() {
        return modDate;
    }

    public Schedule modDate(Instant modDate) {
        this.modDate = modDate;
        return this;
    }

    public void setModDate(Instant modDate) {
        this.modDate = modDate;
    }

    public Integer getPlannedDate() {
        return plannedDate;
    }

    public Schedule plannedDate(Integer plannedDate) {
        this.plannedDate = plannedDate;
        return this;
    }

    public void setPlannedDate(Integer plannedDate) {
        this.plannedDate = plannedDate;
    }

    public Integer getPlannedDuration() {
        return plannedDuration;
    }

    public Schedule plannedDuration(Integer plannedDuration) {
        this.plannedDuration = plannedDuration;
        return this;
    }

    public void setPlannedDuration(Integer plannedDuration) {
        this.plannedDuration = plannedDuration;
    }

    public Set<Classroom> getClassrooms() {
        return classrooms;
    }

    public Schedule classrooms(Set<Classroom> classrooms) {
        this.classrooms = classrooms;
        return this;
    }

    public Schedule addClassroom(Classroom classroom) {
        this.classrooms.add(classroom);
        classroom.setSchedule(this);
        return this;
    }

    public Schedule removeClassroom(Classroom classroom) {
        this.classrooms.remove(classroom);
        classroom.setSchedule(null);
        return this;
    }

    public void setClassrooms(Set<Classroom> classrooms) {
        this.classrooms = classrooms;
    }

    public Batch getBatch() {
        return batch;
    }

    public Schedule batch(Batch batch) {
        this.batch = batch;
        return this;
    }

    public void setBatch(Batch batch) {
        this.batch = batch;
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
        Schedule schedule = (Schedule) o;
        if (schedule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), schedule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Schedule{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", modDate='" + getModDate() + "'" +
            ", plannedDate=" + getPlannedDate() +
            ", plannedDuration=" + getPlannedDuration() +
            "}";
    }
}
