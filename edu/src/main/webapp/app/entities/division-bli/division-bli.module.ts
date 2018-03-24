import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    DivisionBliService,
    DivisionBliPopupService,
    DivisionBliComponent,
    DivisionBliDetailComponent,
    DivisionBliDialogComponent,
    DivisionBliPopupComponent,
    DivisionBliDeletePopupComponent,
    DivisionBliDeleteDialogComponent,
    divisionRoute,
    divisionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...divisionRoute,
    ...divisionPopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DivisionBliComponent,
        DivisionBliDetailComponent,
        DivisionBliDialogComponent,
        DivisionBliDeleteDialogComponent,
        DivisionBliPopupComponent,
        DivisionBliDeletePopupComponent,
    ],
    entryComponents: [
        DivisionBliComponent,
        DivisionBliDialogComponent,
        DivisionBliPopupComponent,
        DivisionBliDeleteDialogComponent,
        DivisionBliDeletePopupComponent,
    ],
    providers: [
        DivisionBliService,
        DivisionBliPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduDivisionBliModule {}
