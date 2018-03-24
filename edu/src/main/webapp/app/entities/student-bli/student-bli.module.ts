import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    StudentBliService,
    StudentBliPopupService,
    StudentBliComponent,
    StudentBliDetailComponent,
    StudentBliDialogComponent,
    StudentBliPopupComponent,
    StudentBliDeletePopupComponent,
    StudentBliDeleteDialogComponent,
    studentRoute,
    studentPopupRoute,
    StudentBliResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...studentRoute,
    ...studentPopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StudentBliComponent,
        StudentBliDetailComponent,
        StudentBliDialogComponent,
        StudentBliDeleteDialogComponent,
        StudentBliPopupComponent,
        StudentBliDeletePopupComponent,
    ],
    entryComponents: [
        StudentBliComponent,
        StudentBliDialogComponent,
        StudentBliPopupComponent,
        StudentBliDeleteDialogComponent,
        StudentBliDeletePopupComponent,
    ],
    providers: [
        StudentBliService,
        StudentBliPopupService,
        StudentBliResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduStudentBliModule {}
