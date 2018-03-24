import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EduOrganizationBliModule } from './organization-bli/organization-bli.module';
import { EduDivisionBliModule } from './division-bli/division-bli.module';
import { EduEmployeeBliModule } from './employee-bli/employee-bli.module';
import { EduCourseBliModule } from './course-bli/course-bli.module';
import { EduSubjectBliModule } from './subject-bli/subject-bli.module';
import { EduEnquiryBliModule } from './enquiry-bli/enquiry-bli.module';
import { EduFollowUpBliModule } from './follow-up-bli/follow-up-bli.module';
import { EduStudentBliModule } from './student-bli/student-bli.module';
import { EduEnrollBliModule } from './enroll-bli/enroll-bli.module';
import { EduPaymentBliModule } from './payment-bli/payment-bli.module';
import { EduBatchBliModule } from './batch-bli/batch-bli.module';
import { EduScheduleBliModule } from './schedule-bli/schedule-bli.module';
import { EduClassroomBliModule } from './classroom-bli/classroom-bli.module';
import { EduClassLogBliModule } from './class-log-bli/class-log-bli.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        EduOrganizationBliModule,
        EduDivisionBliModule,
        EduEmployeeBliModule,
        EduCourseBliModule,
        EduSubjectBliModule,
        EduEnquiryBliModule,
        EduFollowUpBliModule,
        EduStudentBliModule,
        EduEnrollBliModule,
        EduPaymentBliModule,
        EduBatchBliModule,
        EduScheduleBliModule,
        EduClassroomBliModule,
        EduClassLogBliModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduEntityModule {}
