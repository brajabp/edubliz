import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BatchBliComponent } from './batch-bli.component';
import { BatchBliDetailComponent } from './batch-bli-detail.component';
import { BatchBliPopupComponent } from './batch-bli-dialog.component';
import { BatchBliDeletePopupComponent } from './batch-bli-delete-dialog.component';

@Injectable()
export class BatchBliResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const batchRoute: Routes = [
    {
        path: 'batch-bli',
        component: BatchBliComponent,
        resolve: {
            'pagingParams': BatchBliResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.batch.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'batch-bli/:id',
        component: BatchBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.batch.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const batchPopupRoute: Routes = [
    {
        path: 'batch-bli-new',
        component: BatchBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.batch.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'batch-bli/:id/edit',
        component: BatchBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.batch.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'batch-bli/:id/delete',
        component: BatchBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.batch.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
