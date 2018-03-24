import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ClassLogBli } from './class-log-bli.model';
import { ClassLogBliService } from './class-log-bli.service';

@Component({
    selector: 'jhi-class-log-bli-detail',
    templateUrl: './class-log-bli-detail.component.html'
})
export class ClassLogBliDetailComponent implements OnInit, OnDestroy {

    classLog: ClassLogBli;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private classLogService: ClassLogBliService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClassLogs();
    }

    load(id) {
        this.classLogService.find(id)
            .subscribe((classLogResponse: HttpResponse<ClassLogBli>) => {
                this.classLog = classLogResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClassLogs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'classLogListModification',
            (response) => this.load(this.classLog.id)
        );
    }
}
