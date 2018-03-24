import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SubjectBliComponent } from './subject-bli.component';
import { SubjectBliDetailComponent } from './subject-bli-detail.component';
import { SubjectBliPopupComponent } from './subject-bli-dialog.component';
import { SubjectBliDeletePopupComponent } from './subject-bli-delete-dialog.component';

export const subjectRoute: Routes = [
    {
        path: 'subject-bli',
        component: SubjectBliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'subject-bli/:id',
        component: SubjectBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subjectPopupRoute: Routes = [
    {
        path: 'subject-bli-new',
        component: SubjectBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subject-bli/:id/edit',
        component: SubjectBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subject-bli/:id/delete',
        component: SubjectBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.subject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
