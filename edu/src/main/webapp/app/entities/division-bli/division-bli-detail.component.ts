import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DivisionBli } from './division-bli.model';
import { DivisionBliService } from './division-bli.service';

@Component({
    selector: 'jhi-division-bli-detail',
    templateUrl: './division-bli-detail.component.html'
})
export class DivisionBliDetailComponent implements OnInit, OnDestroy {

    division: DivisionBli;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private divisionService: DivisionBliService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDivisions();
    }

    load(id) {
        this.divisionService.find(id)
            .subscribe((divisionResponse: HttpResponse<DivisionBli>) => {
                this.division = divisionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDivisions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'divisionListModification',
            (response) => this.load(this.division.id)
        );
    }
}
