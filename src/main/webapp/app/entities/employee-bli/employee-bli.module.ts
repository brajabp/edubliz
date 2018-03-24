import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EduSharedModule } from '../../shared';
import {
    EmployeeBliService,
    EmployeeBliPopupService,
    EmployeeBliComponent,
    EmployeeBliDetailComponent,
    EmployeeBliDialogComponent,
    EmployeeBliPopupComponent,
    EmployeeBliDeletePopupComponent,
    EmployeeBliDeleteDialogComponent,
    employeeRoute,
    employeePopupRoute,
} from './';

const ENTITY_STATES = [
    ...employeeRoute,
    ...employeePopupRoute,
];

@NgModule({
    imports: [
        EduSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmployeeBliComponent,
        EmployeeBliDetailComponent,
        EmployeeBliDialogComponent,
        EmployeeBliDeleteDialogComponent,
        EmployeeBliPopupComponent,
        EmployeeBliDeletePopupComponent,
    ],
    entryComponents: [
        EmployeeBliComponent,
        EmployeeBliDialogComponent,
        EmployeeBliPopupComponent,
        EmployeeBliDeleteDialogComponent,
        EmployeeBliDeletePopupComponent,
    ],
    providers: [
        EmployeeBliService,
        EmployeeBliPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EduEmployeeBliModule {}
