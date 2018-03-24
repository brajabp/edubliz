import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FollowUpBli } from './follow-up-bli.model';
import { FollowUpBliService } from './follow-up-bli.service';

@Component({
    selector: 'jhi-follow-up-bli-detail',
    templateUrl: './follow-up-bli-detail.component.html'
})
export class FollowUpBliDetailComponent implements OnInit, OnDestroy {

    followUp: FollowUpBli;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private followUpService: FollowUpBliService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFollowUps();
    }

    load(id) {
        this.followUpService.find(id)
            .subscribe((followUpResponse: HttpResponse<FollowUpBli>) => {
                this.followUp = followUpResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFollowUps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'followUpListModification',
            (response) => this.load(this.followUp.id)
        );
    }
}
