import { BaseEntity } from './../../shared';

export const enum Status {
    'ACTIVE',
    'INACTIVE'
}

export const enum LogType {
    'TEACHER_JOINED',
    'STUDENT_JOINED',
    'CLASS_NOTE',
    'TODO',
    'DONE'
}

export class ClassLogBli implements BaseEntity {
    constructor(
        public id?: number,
        public status?: Status,
        public createDate?: any,
        public modDate?: any,
        public actualDate?: number,
        public actualDuration?: number,
        public sudentPresent?: number,
        public logType?: LogType,
        public classroomId?: number,
    ) {
    }
}
