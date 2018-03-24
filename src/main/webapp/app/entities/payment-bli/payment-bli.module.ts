import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    PaymentBliService,
    PaymentBliPopupService,
    PaymentBliComponent,
    PaymentBliDetailComponent,
    PaymentBliDialogComponent,
    PaymentBliPopupComponent,
    PaymentBliDeletePopupComponent,
    PaymentBliDeleteDialogComponent,
    paymentRoute,
    paymentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...paymentRoute,
    ...paymentPopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PaymentBliComponent,
        PaymentBliDetailComponent,
        PaymentBliDialogComponent,
        PaymentBliDeleteDialogComponent,
        PaymentBliPopupComponent,
        PaymentBliDeletePopupComponent,
    ],
    entryComponents: [
        PaymentBliComponent,
        PaymentBliDialogComponent,
        PaymentBliPopupComponent,
        PaymentBliDeleteDialogComponent,
        PaymentBliDeletePopupComponent,
    ],
    providers: [
        PaymentBliService,
        PaymentBliPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduPaymentBliModule {}
