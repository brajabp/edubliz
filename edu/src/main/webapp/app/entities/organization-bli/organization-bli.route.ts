import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OrganizationBliComponent } from './organization-bli.component';
import { OrganizationBliDetailComponent } from './organization-bli-detail.component';
import { OrganizationBliPopupComponent } from './organization-bli-dialog.component';
import { OrganizationBliDeletePopupComponent } from './organization-bli-delete-dialog.component';

export const organizationRoute: Routes = [
    {
        path: 'organization-bli',
        component: OrganizationBliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.organization.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'organization-bli/:id',
        component: OrganizationBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.organization.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const organizationPopupRoute: Routes = [
    {
        path: 'organization-bli-new',
        component: OrganizationBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.organization.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organization-bli/:id/edit',
        component: OrganizationBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.organization.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organization-bli/:id/delete',
        component: OrganizationBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.organization.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
