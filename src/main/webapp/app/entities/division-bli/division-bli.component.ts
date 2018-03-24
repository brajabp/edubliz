import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DivisionBli } from './division-bli.model';
import { DivisionBliService } from './division-bli.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-division-bli',
    templateUrl: './division-bli.component.html'
})
export class DivisionBliComponent implements OnInit, OnDestroy {
divisions: DivisionBli[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private divisionService: DivisionBliService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.divisionService.query().subscribe(
            (res: HttpResponse<DivisionBli[]>) => {
                this.divisions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDivisions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DivisionBli) {
        return item.id;
    }
    registerChangeInDivisions() {
        this.eventSubscriber = this.eventManager.subscribe('divisionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
