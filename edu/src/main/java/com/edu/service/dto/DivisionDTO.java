package com.edu.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.edu.domain.enumeration.Status;
import com.edu.domain.enumeration.AccountStatus;

/**
 * A DTO for the Division entity.
 */
public class DivisionDTO implements Serializable {

    private Long id;

    private String name;

    private Status status;

    private AccountStatus accountStatus;

    private Instant createDate;

    private Instant modDate;

    private Long organizationId;

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

    public AccountStatus getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
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

    public Long getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Long organizationId) {
        this.organizationId = organizationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DivisionDTO divisionDTO = (DivisionDTO) o;
        if(divisionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), divisionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DivisionDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", accountStatus='" + getAccountStatus() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", modDate='" + getModDate() + "'" +
            "}";
    }
}
