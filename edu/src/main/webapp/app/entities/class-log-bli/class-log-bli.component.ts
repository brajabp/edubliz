import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClassLogBli } from './class-log-bli.model';
import { ClassLogBliService } from './class-log-bli.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-class-log-bli',
    templateUrl: './class-log-bli.component.html'
})
export class ClassLogBliComponent implements OnInit, OnDestroy {
classLogs: ClassLogBli[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private classLogService: ClassLogBliService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.classLogService.query().subscribe(
            (res: HttpResponse<ClassLogBli[]>) => {
                this.classLogs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInClassLogs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ClassLogBli) {
        return item.id;
    }
    registerChangeInClassLogs() {
        this.eventSubscriber = this.eventManager.subscribe('classLogListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
