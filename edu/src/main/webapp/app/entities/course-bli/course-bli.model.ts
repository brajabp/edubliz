import { BaseEntity } from './../../shared';

export const enum Status {
    'ACTIVE',
    'INACTIVE'
}

export class CourseBli implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: Status,
        public createDate?: any,
        public modDate?: any,
        public fee?: number,
        public durationYear?: number,
        public durationMonth?: number,
        public durationDay?: number,
        public enrolls?: BaseEntity[],
        public subjects?: BaseEntity[],
        public organizationId?: number,
    ) {
    }
}
