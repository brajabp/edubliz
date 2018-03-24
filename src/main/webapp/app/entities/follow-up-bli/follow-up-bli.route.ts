import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FollowUpBliComponent } from './follow-up-bli.component';
import { FollowUpBliDetailComponent } from './follow-up-bli-detail.component';
import { FollowUpBliPopupComponent } from './follow-up-bli-dialog.component';
import { FollowUpBliDeletePopupComponent } from './follow-up-bli-delete-dialog.component';

export const followUpRoute: Routes = [
    {
        path: 'follow-up-bli',
        component: FollowUpBliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.followUp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'follow-up-bli/:id',
        component: FollowUpBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.followUp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const followUpPopupRoute: Routes = [
    {
        path: 'follow-up-bli-new',
        component: FollowUpBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.followUp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'follow-up-bli/:id/edit',
        component: FollowUpBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.followUp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'follow-up-bli/:id/delete',
        component: FollowUpBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.followUp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
