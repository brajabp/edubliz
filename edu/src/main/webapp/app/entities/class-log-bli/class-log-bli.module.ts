import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    ClassLogBliService,
    ClassLogBliPopupService,
    ClassLogBliComponent,
    ClassLogBliDetailComponent,
    ClassLogBliDialogComponent,
    ClassLogBliPopupComponent,
    ClassLogBliDeletePopupComponent,
    ClassLogBliDeleteDialogComponent,
    classLogRoute,
    classLogPopupRoute,
} from './';

const ENTITY_STATES = [
    ...classLogRoute,
    ...classLogPopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClassLogBliComponent,
        ClassLogBliDetailComponent,
        ClassLogBliDialogComponent,
        ClassLogBliDeleteDialogComponent,
        ClassLogBliPopupComponent,
        ClassLogBliDeletePopupComponent,
    ],
    entryComponents: [
        ClassLogBliComponent,
        ClassLogBliDialogComponent,
        ClassLogBliPopupComponent,
        ClassLogBliDeleteDialogComponent,
        ClassLogBliDeletePopupComponent,
    ],
    providers: [
        ClassLogBliService,
        ClassLogBliPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduClassLogBliModule {}
