import { BaseEntity } from './../../shared';

export const enum Status {
    'ACTIVE',
    'INACTIVE'
}

export class BatchBli implements BaseEntity {
    constructor(
        public id?: number,
        public status?: Status,
        public createDate?: any,
        public modDate?: any,
        public startDate?: number,
        public endDate?: number,
        public sudentCapacity?: number,
        public schedules?: BaseEntity[],
        public enrolls?: BaseEntity[],
        public subjectId?: number,
        public studentId?: number,
        public employeeId?: number,
    ) {
    }
}
