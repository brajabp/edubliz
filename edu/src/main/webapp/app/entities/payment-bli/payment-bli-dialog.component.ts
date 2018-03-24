import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PaymentBli } from './payment-bli.model';
import { PaymentBliPopupService } from './payment-bli-popup.service';
import { PaymentBliService } from './payment-bli.service';
import { OrganizationBli, OrganizationBliService } from '../organization-bli';
import { EnrollBli, EnrollBliService } from '../enroll-bli';

@Component({
    selector: 'jhi-payment-bli-dialog',
    templateUrl: './payment-bli-dialog.component.html'
})
export class PaymentBliDialogComponent implements OnInit {

    payment: PaymentBli;
    isSaving: boolean;

    organizations: OrganizationBli[];

    enrolls: EnrollBli[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private paymentService: PaymentBliService,
        private organizationService: OrganizationBliService,
        private enrollService: EnrollBliService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.organizationService.query()
            .subscribe((res: HttpResponse<OrganizationBli[]>) => { this.organizations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.enrollService.query()
            .subscribe((res: HttpResponse<EnrollBli[]>) => { this.enrolls = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.payment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paymentService.update(this.payment));
        } else {
            this.subscribeToSaveResponse(
                this.paymentService.create(this.payment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PaymentBli>>) {
        result.subscribe((res: HttpResponse<PaymentBli>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PaymentBli) {
        this.eventManager.broadcast({ name: 'paymentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrganizationById(index: number, item: OrganizationBli) {
        return item.id;
    }

    trackEnrollById(index: number, item: EnrollBli) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-payment-bli-popup',
    template: ''
})
export class PaymentBliPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentPopupService: PaymentBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.paymentPopupService
                    .open(PaymentBliDialogComponent as Component, params['id']);
            } else {
                this.paymentPopupService
                    .open(PaymentBliDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
