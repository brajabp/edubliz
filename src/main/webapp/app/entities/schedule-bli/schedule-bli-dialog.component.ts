import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ScheduleBli } from './schedule-bli.model';
import { ScheduleBliPopupService } from './schedule-bli-popup.service';
import { ScheduleBliService } from './schedule-bli.service';
import { BatchBli, BatchBliService } from '../batch-bli';

@Component({
    selector: 'jhi-schedule-bli-dialog',
    templateUrl: './schedule-bli-dialog.component.html'
})
export class ScheduleBliDialogComponent implements OnInit {

    schedule: ScheduleBli;
    isSaving: boolean;

    batches: BatchBli[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private scheduleService: ScheduleBliService,
        private batchService: BatchBliService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.batchService.query()
            .subscribe((res: HttpResponse<BatchBli[]>) => { this.batches = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.schedule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scheduleService.update(this.schedule));
        } else {
            this.subscribeToSaveResponse(
                this.scheduleService.create(this.schedule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ScheduleBli>>) {
        result.subscribe((res: HttpResponse<ScheduleBli>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ScheduleBli) {
        this.eventManager.broadcast({ name: 'scheduleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBatchById(index: number, item: BatchBli) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-schedule-bli-popup',
    template: ''
})
export class ScheduleBliPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schedulePopupService: ScheduleBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.schedulePopupService
                    .open(ScheduleBliDialogComponent as Component, params['id']);
            } else {
                this.schedulePopupService
                    .open(ScheduleBliDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
