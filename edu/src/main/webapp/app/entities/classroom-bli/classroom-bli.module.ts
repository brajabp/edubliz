import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    ClassroomBliService,
    ClassroomBliPopupService,
    ClassroomBliComponent,
    ClassroomBliDetailComponent,
    ClassroomBliDialogComponent,
    ClassroomBliPopupComponent,
    ClassroomBliDeletePopupComponent,
    ClassroomBliDeleteDialogComponent,
    classroomRoute,
    classroomPopupRoute,
} from './';

const ENTITY_STATES = [
    ...classroomRoute,
    ...classroomPopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClassroomBliComponent,
        ClassroomBliDetailComponent,
        ClassroomBliDialogComponent,
        ClassroomBliDeleteDialogComponent,
        ClassroomBliPopupComponent,
        ClassroomBliDeletePopupComponent,
    ],
    entryComponents: [
        ClassroomBliComponent,
        ClassroomBliDialogComponent,
        ClassroomBliPopupComponent,
        ClassroomBliDeleteDialogComponent,
        ClassroomBliDeletePopupComponent,
    ],
    providers: [
        ClassroomBliService,
        ClassroomBliPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduClassroomBliModule {}
