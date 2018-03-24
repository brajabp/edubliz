import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EnrollBli } from './enroll-bli.model';
import { EnrollBliService } from './enroll-bli.service';

@Component({
    selector: 'jhi-enroll-bli-detail',
    templateUrl: './enroll-bli-detail.component.html'
})
export class EnrollBliDetailComponent implements OnInit, OnDestroy {

    enroll: EnrollBli;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private enrollService: EnrollBliService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEnrolls();
    }

    load(id) {
        this.enrollService.find(id)
            .subscribe((enrollResponse: HttpResponse<EnrollBli>) => {
                this.enroll = enrollResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEnrolls() {
        this.eventSubscriber = this.eventManager.subscribe(
            'enrollListModification',
            (response) => this.load(this.enroll.id)
        );
    }
}
