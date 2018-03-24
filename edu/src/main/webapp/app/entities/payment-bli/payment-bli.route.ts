import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaymentBliComponent } from './payment-bli.component';
import { PaymentBliDetailComponent } from './payment-bli-detail.component';
import { PaymentBliPopupComponent } from './payment-bli-dialog.component';
import { PaymentBliDeletePopupComponent } from './payment-bli-delete-dialog.component';

export const paymentRoute: Routes = [
    {
        path: 'payment-bli',
        component: PaymentBliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'payment-bli/:id',
        component: PaymentBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentPopupRoute: Routes = [
    {
        path: 'payment-bli-new',
        component: PaymentBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-bli/:id/edit',
        component: PaymentBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-bli/:id/delete',
        component: PaymentBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
