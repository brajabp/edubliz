import { BaseEntity } from './../../shared';

export const enum Status {
    'ACTIVE',
    'INACTIVE'
}

export const enum AccountStatus {
    'PENDING',
    'SUBSCRIBED',
    'UNSUBSCRIBED'
}

export class DivisionBli implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: Status,
        public accountStatus?: AccountStatus,
        public createDate?: any,
        public modDate?: any,
        public organizationId?: number,
    ) {
    }
}
