import { BaseEntity } from './../../shared';

export const enum Status {
    'ACTIVE',
    'INACTIVE'
}

export class ClassroomBli implements BaseEntity {
    constructor(
        public id?: number,
        public status?: Status,
        public createDate?: any,
        public modDate?: any,
        public actualDate?: number,
        public actualDuration?: number,
        public sudentPresent?: number,
        public classLogs?: BaseEntity[],
        public scheduleId?: number,
    ) {
    }
}
