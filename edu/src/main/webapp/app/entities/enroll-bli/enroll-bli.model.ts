import { BaseEntity } from './../../shared';

export const enum AccountStatus {
    'PENDING',
    'SUBSCRIBED',
    'UNSUBSCRIBED'
}

export class EnrollBli implements BaseEntity {
    constructor(
        public id?: number,
        public accountStatus?: AccountStatus,
        public createDate?: any,
        public modDate?: any,
        public payments?: BaseEntity[],
        public courseId?: number,
        public studentId?: number,
        public batchId?: number,
    ) {
    }
}
