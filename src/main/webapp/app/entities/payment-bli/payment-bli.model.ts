import { BaseEntity } from './../../shared';

export const enum Status {
    'ACTIVE',
    'INACTIVE'
}

export class PaymentBli implements BaseEntity {
    constructor(
        public id?: number,
        public status?: Status,
        public amount?: number,
        public createDate?: any,
        public modDate?: any,
        public organizationId?: number,
        public enrollId?: number,
    ) {
    }
}
