import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ScheduleBliComponent } from './schedule-bli.component';
import { ScheduleBliDetailComponent } from './schedule-bli-detail.component';
import { ScheduleBliPopupComponent } from './schedule-bli-dialog.component';
import { ScheduleBliDeletePopupComponent } from './schedule-bli-delete-dialog.component';

export const scheduleRoute: Routes = [
    {
        path: 'schedule-bli',
        component: ScheduleBliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'schedule-bli/:id',
        component: ScheduleBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schedulePopupRoute: Routes = [
    {
        path: 'schedule-bli-new',
        component: ScheduleBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'schedule-bli/:id/edit',
        component: ScheduleBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'schedule-bli/:id/delete',
        component: ScheduleBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
