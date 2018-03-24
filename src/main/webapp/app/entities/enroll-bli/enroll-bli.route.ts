import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EnrollBliComponent } from './enroll-bli.component';
import { EnrollBliDetailComponent } from './enroll-bli-detail.component';
import { EnrollBliPopupComponent } from './enroll-bli-dialog.component';
import { EnrollBliDeletePopupComponent } from './enroll-bli-delete-dialog.component';

export const enrollRoute: Routes = [
    {
        path: 'enroll-bli',
        component: EnrollBliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.enroll.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'enroll-bli/:id',
        component: EnrollBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.enroll.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enrollPopupRoute: Routes = [
    {
        path: 'enroll-bli-new',
        component: EnrollBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.enroll.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enroll-bli/:id/edit',
        component: EnrollBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.enroll.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enroll-bli/:id/delete',
        component: EnrollBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.enroll.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
