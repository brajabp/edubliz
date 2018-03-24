import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DivisionBliComponent } from './division-bli.component';
import { DivisionBliDetailComponent } from './division-bli-detail.component';
import { DivisionBliPopupComponent } from './division-bli-dialog.component';
import { DivisionBliDeletePopupComponent } from './division-bli-delete-dialog.component';

export const divisionRoute: Routes = [
    {
        path: 'division-bli',
        component: DivisionBliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.division.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'division-bli/:id',
        component: DivisionBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.division.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const divisionPopupRoute: Routes = [
    {
        path: 'division-bli-new',
        component: DivisionBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.division.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'division-bli/:id/edit',
        component: DivisionBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.division.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'division-bli/:id/delete',
        component: DivisionBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.division.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
