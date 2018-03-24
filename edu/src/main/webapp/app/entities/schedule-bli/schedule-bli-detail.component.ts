import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ScheduleBli } from './schedule-bli.model';
import { ScheduleBliService } from './schedule-bli.service';

@Component({
    selector: 'jhi-schedule-bli-detail',
    templateUrl: './schedule-bli-detail.component.html'
})
export class ScheduleBliDetailComponent implements OnInit, OnDestroy {

    schedule: ScheduleBli;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private scheduleService: ScheduleBliService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSchedules();
    }

    load(id) {
        this.scheduleService.find(id)
            .subscribe((scheduleResponse: HttpResponse<ScheduleBli>) => {
                this.schedule = scheduleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSchedules() {
        this.eventSubscriber = this.eventManager.subscribe(
            'scheduleListModification',
            (response) => this.load(this.schedule.id)
        );
    }
}
