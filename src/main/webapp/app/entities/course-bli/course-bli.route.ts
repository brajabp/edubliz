import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CourseBliComponent } from './course-bli.component';
import { CourseBliDetailComponent } from './course-bli-detail.component';
import { CourseBliPopupComponent } from './course-bli-dialog.component';
import { CourseBliDeletePopupComponent } from './course-bli-delete-dialog.component';

export const courseRoute: Routes = [
    {
        path: 'course-bli',
        component: CourseBliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'course-bli/:id',
        component: CourseBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const coursePopupRoute: Routes = [
    {
        path: 'course-bli-new',
        component: CourseBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.course.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'course-bli/:id/edit',
        component: CourseBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.course.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'course-bli/:id/delete',
        component: CourseBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.course.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
