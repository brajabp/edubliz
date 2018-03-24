import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StudentBliComponent } from './student-bli.component';
import { StudentBliDetailComponent } from './student-bli-detail.component';
import { StudentBliPopupComponent } from './student-bli-dialog.component';
import { StudentBliDeletePopupComponent } from './student-bli-delete-dialog.component';

@Injectable()
export class StudentBliResolvePagingParams implements Resolve<any> {

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

export const studentRoute: Routes = [
    {
        path: 'student-bli',
        component: StudentBliComponent,
        resolve: {
            'pagingParams': StudentBliResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'student-bli/:id',
        component: StudentBliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentPopupRoute: Routes = [
    {
        path: 'student-bli-new',
        component: StudentBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'student-bli/:id/edit',
        component: StudentBliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'student-bli/:id/delete',
        component: StudentBliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eduApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
