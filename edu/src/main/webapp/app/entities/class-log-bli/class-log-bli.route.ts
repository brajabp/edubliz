import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClassLogBliComponent } from './class-log-bli.component';
import { ClassLogBliDetailComponent } from './class-log-bli-detail.component';
import { ClassLogBliPopupComponent } from './class-log-bli-dialog.component';
import { ClassLogBliDeletePopupComponent } from './class-log-bli-delete-dialog.component';

export const classLogRoute: Routes = [
    {
        path: 'class-log-bli',
        component: ClassLogBliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.classLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'class-log-bli/:id',
        component: ClassLogBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.classLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const classLogPopupRoute: Routes = [
    {
        path: 'class-log-bli-new',
        component: ClassLogBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.classLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'class-log-bli/:id/edit',
        component: ClassLogBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.classLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'class-log-bli/:id/delete',
        component: ClassLogBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.classLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
