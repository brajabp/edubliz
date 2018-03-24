import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BatchBli } from './batch-bli.model';
import { BatchBliService } from './batch-bli.service';

@Component({
    selector: 'jhi-batch-bli-detail',
    templateUrl: './batch-bli-detail.component.html'
})
export class BatchBliDetailComponent implements OnInit, OnDestroy {

    batch: BatchBli;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private batchService: BatchBliService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBatches();
    }

    load(id) {
        this.batchService.find(id)
            .subscribe((batchResponse: HttpResponse<BatchBli>) => {
                this.batch = batchResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBatches() {
        this.eventSubscriber = this.eventManager.subscribe(
            'batchListModification',
            (response) => this.load(this.batch.id)
        );
    }
}
