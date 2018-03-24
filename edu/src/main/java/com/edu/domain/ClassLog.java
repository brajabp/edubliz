package com.edu.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.edu.domain.enumeration.Status;

import com.edu.domain.enumeration.LogType;

/**
 * A ClassLog.
 */
@Entity
@Table(name = "class_log")
public class ClassLog implements Serializable {

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

    @Column(name = "actual_date")
    private Integer actualDate;

    @Column(name = "actual_duration")
    private Integer actualDuration;

    @Column(name = "sudent_present")
    private Integer sudentPresent;

    @Enumerated(EnumType.STRING)
    @Column(name = "log_type")
    private LogType logType;

    @ManyToOne
    private Classroom classroom;

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

    public ClassLog status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public ClassLog createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getModDate() {
        return modDate;
    }

    public ClassLog modDate(Instant modDate) {
        this.modDate = modDate;
        return this;
    }

    public void setModDate(Instant modDate) {
        this.modDate = modDate;
    }

    public Integer getActualDate() {
        return actualDate;
    }

    public ClassLog actualDate(Integer actualDate) {
        this.actualDate = actualDate;
        return this;
    }

    public void setActualDate(Integer actualDate) {
        this.actualDate = actualDate;
    }

    public Integer getActualDuration() {
        return actualDuration;
    }

    public ClassLog actualDuration(Integer actualDuration) {
        this.actualDuration = actualDuration;
        return this;
    }

    public void setActualDuration(Integer actualDuration) {
        this.actualDuration = actualDuration;
    }

    public Integer getSudentPresent() {
        return sudentPresent;
    }

    public ClassLog sudentPresent(Integer sudentPresent) {
        this.sudentPresent = sudentPresent;
        return this;
    }

    public void setSudentPresent(Integer sudentPresent) {
        this.sudentPresent = sudentPresent;
    }

    public LogType getLogType() {
        return logType;
    }

    public ClassLog logType(LogType logType) {
        this.logType = logType;
        return this;
    }

    public void setLogType(LogType logType) {
        this.logType = logType;
    }

    public Classroom getClassroom() {
        return classroom;
    }

    public ClassLog classroom(Classroom classroom) {
        this.classroom = classroom;
        return this;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
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
        ClassLog classLog = (ClassLog) o;
        if (classLog.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), classLog.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClassLog{" +
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
