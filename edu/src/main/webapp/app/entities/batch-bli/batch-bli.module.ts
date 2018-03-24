import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    BatchBliService,
    BatchBliPopupService,
    BatchBliComponent,
    BatchBliDetailComponent,
    BatchBliDialogComponent,
    BatchBliPopupComponent,
    BatchBliDeletePopupComponent,
    BatchBliDeleteDialogComponent,
    batchRoute,
    batchPopupRoute,
    BatchBliResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...batchRoute,
    ...batchPopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BatchBliComponent,
        BatchBliDetailComponent,
        BatchBliDialogComponent,
        BatchBliDeleteDialogComponent,
        BatchBliPopupComponent,
        BatchBliDeletePopupComponent,
    ],
    entryComponents: [
        BatchBliComponent,
        BatchBliDialogComponent,
        BatchBliPopupComponent,
        BatchBliDeleteDialogComponent,
        BatchBliDeletePopupComponent,
    ],
    providers: [
        BatchBliService,
        BatchBliPopupService,
        BatchBliResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduBatchBliModule {}
