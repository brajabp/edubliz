import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ScheduleBli } from './schedule-bli.model';
import { ScheduleBliService } from './schedule-bli.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-schedule-bli',
    templateUrl: './schedule-bli.component.html'
})
export class ScheduleBliComponent implements OnInit, OnDestroy {
schedules: ScheduleBli[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private scheduleService: ScheduleBliService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.scheduleService.query().subscribe(
            (res: HttpResponse<ScheduleBli[]>) => {
                this.schedules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSchedules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ScheduleBli) {
        return item.id;
    }
    registerChangeInSchedules() {
        this.eventSubscriber = this.eventManager.subscribe('scheduleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
