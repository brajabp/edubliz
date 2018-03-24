import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClassroomBliComponent } from './classroom-bli.component';
import { ClassroomBliDetailComponent } from './classroom-bli-detail.component';
import { ClassroomBliPopupComponent } from './classroom-bli-dialog.component';
import { ClassroomBliDeletePopupComponent } from './classroom-bli-delete-dialog.component';

export const classroomRoute: Routes = [
    {
        path: 'classroom-bli',
        component: ClassroomBliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'classroom-bli/:id',
        component: ClassroomBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const classroomPopupRoute: Routes = [
    {
        path: 'classroom-bli-new',
        component: ClassroomBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'classroom-bli/:id/edit',
        component: ClassroomBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'classroom-bli/:id/delete',
        component: ClassroomBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
