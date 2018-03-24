import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    ScheduleBliService,
    ScheduleBliPopupService,
    ScheduleBliComponent,
    ScheduleBliDetailComponent,
    ScheduleBliDialogComponent,
    ScheduleBliPopupComponent,
    ScheduleBliDeletePopupComponent,
    ScheduleBliDeleteDialogComponent,
    scheduleRoute,
    schedulePopupRoute,
} from './';

const ENTITY_STATES = [
    ...scheduleRoute,
    ...schedulePopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ScheduleBliComponent,
        ScheduleBliDetailComponent,
        ScheduleBliDialogComponent,
        ScheduleBliDeleteDialogComponent,
        ScheduleBliPopupComponent,
        ScheduleBliDeletePopupComponent,
    ],
    entryComponents: [
        ScheduleBliComponent,
        ScheduleBliDialogComponent,
        ScheduleBliPopupComponent,
        ScheduleBliDeleteDialogComponent,
        ScheduleBliDeletePopupComponent,
    ],
    providers: [
        ScheduleBliService,
        ScheduleBliPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduScheduleBliModule {}
