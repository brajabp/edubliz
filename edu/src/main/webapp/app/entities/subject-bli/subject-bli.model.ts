import { BaseEntity } from './../../shared';

export const enum Status {
    'ACTIVE',
    'INACTIVE'
}

export class SubjectBli implements BaseEntity {
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
        public batches?: BaseEntity[],
        public courseId?: number,
    ) {
    }
}
