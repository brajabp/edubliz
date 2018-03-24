import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FollowUpBli } from './follow-up-bli.model';
import { FollowUpBliPopupService } from './follow-up-bli-popup.service';
import { FollowUpBliService } from './follow-up-bli.service';
import { EnquiryBli, EnquiryBliService } from '../enquiry-bli';
import { EmployeeBli, EmployeeBliService } from '../employee-bli';

@Component({
    selector: 'jhi-follow-up-bli-dialog',
    templateUrl: './follow-up-bli-dialog.component.html'
})
export class FollowUpBliDialogComponent implements OnInit {

    followUp: FollowUpBli;
    isSaving: boolean;

    enquiries: EnquiryBli[];

    employees: EmployeeBli[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private followUpService: FollowUpBliService,
        private enquiryService: EnquiryBliService,
        private employeeService: EmployeeBliService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.enquiryService.query()
            .subscribe((res: HttpResponse<EnquiryBli[]>) => { this.enquiries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.employeeService.query()
            .subscribe((res: HttpResponse<EmployeeBli[]>) => { this.employees = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.followUp.id !== undefined) {
            this.subscribeToSaveResponse(
                this.followUpService.update(this.followUp));
        } else {
            this.subscribeToSaveResponse(
                this.followUpService.create(this.followUp));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FollowUpBli>>) {
        result.subscribe((res: HttpResponse<FollowUpBli>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FollowUpBli) {
        this.eventManager.broadcast({ name: 'followUpListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEnquiryById(index: number, item: EnquiryBli) {
        return item.id;
    }

    trackEmployeeById(index: number, item: EmployeeBli) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-follow-up-bli-popup',
    template: ''
})
export class FollowUpBliPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private followUpPopupService: FollowUpBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.followUpPopupService
                    .open(FollowUpBliDialogComponent as Component, params['id']);
            } else {
                this.followUpPopupService
                    .open(FollowUpBliDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
