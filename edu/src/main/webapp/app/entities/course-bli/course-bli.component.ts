import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CourseBli } from './course-bli.model';
import { CourseBliService } from './course-bli.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-course-bli',
    templateUrl: './course-bli.component.html'
})
export class CourseBliComponent implements OnInit, OnDestroy {
courses: CourseBli[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private courseService: CourseBliService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.courseService.query().subscribe(
            (res: HttpResponse<CourseBli[]>) => {
                this.courses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCourses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CourseBli) {
        return item.id;
    }
    registerChangeInCourses() {
        this.eventSubscriber = this.eventManager.subscribe('courseListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
