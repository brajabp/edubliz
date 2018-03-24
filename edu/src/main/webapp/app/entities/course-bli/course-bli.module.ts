import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    CourseBliService,
    CourseBliPopupService,
    CourseBliComponent,
    CourseBliDetailComponent,
    CourseBliDialogComponent,
    CourseBliPopupComponent,
    CourseBliDeletePopupComponent,
    CourseBliDeleteDialogComponent,
    courseRoute,
    coursePopupRoute,
} from './';

const ENTITY_STATES = [
    ...courseRoute,
    ...coursePopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CourseBliComponent,
        CourseBliDetailComponent,
        CourseBliDialogComponent,
        CourseBliDeleteDialogComponent,
        CourseBliPopupComponent,
        CourseBliDeletePopupComponent,
    ],
    entryComponents: [
        CourseBliComponent,
        CourseBliDialogComponent,
        CourseBliPopupComponent,
        CourseBliDeleteDialogComponent,
        CourseBliDeletePopupComponent,
    ],
    providers: [
        CourseBliService,
        CourseBliPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduCourseBliModule {}
