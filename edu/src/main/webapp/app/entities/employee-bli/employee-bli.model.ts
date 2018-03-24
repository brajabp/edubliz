import { BaseEntity } from './../../shared';

export const enum Status {
    'ACTIVE',
    'INACTIVE'
}

export const enum JobType {
    'TEACHER',
    'ADMIN',
    'RECEPTIONIST',
    'MAINTAINER'
}

export class EmployeeBli implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: Status,
        public jobType?: JobType,
        public createDate?: any,
        public modDate?: any,
        public joinDate?: any,
        public salary?: number,
        public phone?: string,
        public email?: string,
        public address?: string,
        public batches?: BaseEntity[],
        public followUps?: BaseEntity[],
        public organizationId?: number,
    ) {
    }
}
