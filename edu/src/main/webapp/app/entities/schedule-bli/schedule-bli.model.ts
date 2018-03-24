import { BaseEntity } from './../../shared';

export const enum Status {
    'ACTIVE',
    'INACTIVE'
}

export class ScheduleBli implements BaseEntity {
    constructor(
        public id?: number,
        public status?: Status,
        public createDate?: any,
        public modDate?: any,
        public plannedDate?: number,
        public plannedDuration?: number,
        public classrooms?: BaseEntity[],
        public batchId?: number,
    ) {
    }
}
