import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    EnquiryBliService,
    EnquiryBliPopupService,
    EnquiryBliComponent,
    EnquiryBliDetailComponent,
    EnquiryBliDialogComponent,
    EnquiryBliPopupComponent,
    EnquiryBliDeletePopupComponent,
    EnquiryBliDeleteDialogComponent,
    enquiryRoute,
    enquiryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...enquiryRoute,
    ...enquiryPopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EnquiryBliComponent,
        EnquiryBliDetailComponent,
        EnquiryBliDialogComponent,
        EnquiryBliDeleteDialogComponent,
        EnquiryBliPopupComponent,
        EnquiryBliDeletePopupComponent,
    ],
    entryComponents: [
        EnquiryBliComponent,
        EnquiryBliDialogComponent,
        EnquiryBliPopupComponent,
        EnquiryBliDeleteDialogComponent,
        EnquiryBliDeletePopupComponent,
    ],
    providers: [
        EnquiryBliService,
        EnquiryBliPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduEnquiryBliModule {}
