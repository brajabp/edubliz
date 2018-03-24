import { BaseEntity } from './../../shared';

export const enum Status {
    'ACTIVE',
    'INACTIVE'
}

export class StudentBli implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: Status,
        public createDate?: any,
        public modDate?: any,
        public phone?: string,
        public email?: string,
        public address?: string,
        public enrolls?: BaseEntity[],
        public batches?: BaseEntity[],
        public enquiries?: BaseEntity[],
        public organizationId?: number,
    ) {
    }
}
