import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmployeeBliComponent } from './employee-bli.component';
import { EmployeeBliDetailComponent } from './employee-bli-detail.component';
import { EmployeeBliPopupComponent } from './employee-bli-dialog.component';
import { EmployeeBliDeletePopupComponent } from './employee-bli-delete-dialog.component';

export const employeeRoute: Routes = [
    {
        path: 'employee-bli',
        component: EmployeeBliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'employee-bli/:id',
        component: EmployeeBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeePopupRoute: Routes = [
    {
        path: 'employee-bli-new',
        component: EmployeeBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee-bli/:id/edit',
        component: EmployeeBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee-bli/:id/delete',
        component: EmployeeBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
