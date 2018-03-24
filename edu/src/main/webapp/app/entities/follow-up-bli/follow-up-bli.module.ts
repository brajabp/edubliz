import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    FollowUpBliService,
    FollowUpBliPopupService,
    FollowUpBliComponent,
    FollowUpBliDetailComponent,
    FollowUpBliDialogComponent,
    FollowUpBliPopupComponent,
    FollowUpBliDeletePopupComponent,
    FollowUpBliDeleteDialogComponent,
    followUpRoute,
    followUpPopupRoute,
} from './';

const ENTITY_STATES = [
    ...followUpRoute,
    ...followUpPopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FollowUpBliComponent,
        FollowUpBliDetailComponent,
        FollowUpBliDialogComponent,
        FollowUpBliDeleteDialogComponent,
        FollowUpBliPopupComponent,
        FollowUpBliDeletePopupComponent,
    ],
    entryComponents: [
        FollowUpBliComponent,
        FollowUpBliDialogComponent,
        FollowUpBliPopupComponent,
        FollowUpBliDeleteDialogComponent,
        FollowUpBliDeletePopupComponent,
    ],
    providers: [
        FollowUpBliService,
        FollowUpBliPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduFollowUpBliModule {}
