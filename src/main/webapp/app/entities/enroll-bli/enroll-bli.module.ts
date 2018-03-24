import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    EnrollBliService,
    EnrollBliPopupService,
    EnrollBliComponent,
    EnrollBliDetailComponent,
    EnrollBliDialogComponent,
    EnrollBliPopupComponent,
    EnrollBliDeletePopupComponent,
    EnrollBliDeleteDialogComponent,
    enrollRoute,
    enrollPopupRoute,
} from './';

const ENTITY_STATES = [
    ...enrollRoute,
    ...enrollPopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EnrollBliComponent,
        EnrollBliDetailComponent,
        EnrollBliDialogComponent,
        EnrollBliDeleteDialogComponent,
        EnrollBliPopupComponent,
        EnrollBliDeletePopupComponent,
    ],
    entryComponents: [
        EnrollBliComponent,
        EnrollBliDialogComponent,
        EnrollBliPopupComponent,
        EnrollBliDeleteDialogComponent,
        EnrollBliDeletePopupComponent,
    ],
    providers: [
        EnrollBliService,
        EnrollBliPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduEnrollBliModule {}
