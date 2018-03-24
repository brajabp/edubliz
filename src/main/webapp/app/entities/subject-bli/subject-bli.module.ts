import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    SubjectBliService,
    SubjectBliPopupService,
    SubjectBliComponent,
    SubjectBliDetailComponent,
    SubjectBliDialogComponent,
    SubjectBliPopupComponent,
    SubjectBliDeletePopupComponent,
    SubjectBliDeleteDialogComponent,
    subjectRoute,
    subjectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...subjectRoute,
    ...subjectPopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SubjectBliComponent,
        SubjectBliDetailComponent,
        SubjectBliDialogComponent,
        SubjectBliDeleteDialogComponent,
        SubjectBliPopupComponent,
        SubjectBliDeletePopupComponent,
    ],
    entryComponents: [
        SubjectBliComponent,
        SubjectBliDialogComponent,
        SubjectBliPopupComponent,
        SubjectBliDeleteDialogComponent,
        SubjectBliDeletePopupComponent,
    ],
    providers: [
        SubjectBliService,
        SubjectBliPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduSubjectBliModule {}
