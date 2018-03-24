import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EnquiryBliComponent } from './enquiry-bli.component';
import { EnquiryBliDetailComponent } from './enquiry-bli-detail.component';
import { EnquiryBliPopupComponent } from './enquiry-bli-dialog.component';
import { EnquiryBliDeletePopupComponent } from './enquiry-bli-delete-dialog.component';

export const enquiryRoute: Routes = [
    {
        path: 'enquiry-bli',
        component: EnquiryBliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.enquiry.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'enquiry-bli/:id',
        component: EnquiryBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.enquiry.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enquiryPopupRoute: Routes = [
    {
        path: 'enquiry-bli-new',
        component: EnquiryBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.enquiry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enquiry-bli/:id/edit',
        component: EnquiryBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.enquiry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enquiry-bli/:id/delete',
        component: EnquiryBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.enquiry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
