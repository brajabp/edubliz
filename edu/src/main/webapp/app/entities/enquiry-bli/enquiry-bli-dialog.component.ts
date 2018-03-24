import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EnquiryBli } from './enquiry-bli.model';
import { EnquiryBliPopupService } from './enquiry-bli-popup.service';
import { EnquiryBliService } from './enquiry-bli.service';
import { OrganizationBli, OrganizationBliService } from '../organization-bli';
import { StudentBli, StudentBliService } from '../student-bli';

@Component({
    selector: 'jhi-enquiry-bli-dialog',
    templateUrl: './enquiry-bli-dialog.component.html'
})
export class EnquiryBliDialogComponent implements OnInit {

    enquiry: EnquiryBli;
    isSaving: boolean;

    organizations: OrganizationBli[];

    students: StudentBli[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private enquiryService: EnquiryBliService,
        private organizationService: OrganizationBliService,
        private studentService: StudentBliService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.organizationService.query()
            .subscribe((res: HttpResponse<OrganizationBli[]>) => { this.organizations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.studentService.query()
            .subscribe((res: HttpResponse<StudentBli[]>) => { this.students = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.enquiry.id !== undefined) {
            this.subscribeToSaveResponse(
                this.enquiryService.update(this.enquiry));
        } else {
            this.subscribeToSaveResponse(
                this.enquiryService.create(this.enquiry));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EnquiryBli>>) {
        result.subscribe((res: HttpResponse<EnquiryBli>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EnquiryBli) {
        this.eventManager.broadcast({ name: 'enquiryListModification', content: 'OK'});
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

    trackStudentById(index: number, item: StudentBli) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-enquiry-bli-popup',
    template: ''
})
export class EnquiryBliPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enquiryPopupService: EnquiryBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.enquiryPopupService
                    .open(EnquiryBliDialogComponent as Component, params['id']);
            } else {
                this.enquiryPopupService
                    .open(EnquiryBliDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
