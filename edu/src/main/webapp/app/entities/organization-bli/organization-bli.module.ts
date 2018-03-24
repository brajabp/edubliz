import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    OrganizationBliService,
    OrganizationBliPopupService,
    OrganizationBliComponent,
    OrganizationBliDetailComponent,
    OrganizationBliDialogComponent,
    OrganizationBliPopupComponent,
    OrganizationBliDeletePopupComponent,
    OrganizationBliDeleteDialogComponent,
    organizationRoute,
    organizationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...organizationRoute,
    ...organizationPopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrganizationBliComponent,
        OrganizationBliDetailComponent,
        OrganizationBliDialogComponent,
        OrganizationBliDeleteDialogComponent,
        OrganizationBliPopupComponent,
        OrganizationBliDeletePopupComponent,
    ],
    entryComponents: [
        OrganizationBliComponent,
        OrganizationBliDialogComponent,
        OrganizationBliPopupComponent,
        OrganizationBliDeleteDialogComponent,
        OrganizationBliDeletePopupComponent,
    ],
    providers: [
        OrganizationBliService,
        OrganizationBliPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduOrganizationBliModule {}
