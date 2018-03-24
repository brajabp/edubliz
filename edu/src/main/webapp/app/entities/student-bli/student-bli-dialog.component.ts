import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StudentBli } from './student-bli.model';
import { StudentBliPopupService } from './student-bli-popup.service';
import { StudentBliService } from './student-bli.service';
import { OrganizationBli, OrganizationBliService } from '../organization-bli';

@Component({
    selector: 'jhi-student-bli-dialog',
    templateUrl: './student-bli-dialog.component.html'
})
export class StudentBliDialogComponent implements OnInit {

    student: StudentBli;
    isSaving: boolean;

    organizations: OrganizationBli[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private studentService: StudentBliService,
        private organizationService: OrganizationBliService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.organizationService.query()
            .subscribe((res: HttpResponse<OrganizationBli[]>) => { this.organizations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.student.id !== undefined) {
            this.subscribeToSaveResponse(
                this.studentService.update(this.student));
        } else {
            this.subscribeToSaveResponse(
                this.studentService.create(this.student));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StudentBli>>) {
        result.subscribe((res: HttpResponse<StudentBli>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StudentBli) {
        this.eventManager.broadcast({ name: 'studentListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-student-bli-popup',
    template: ''
})
export class StudentBliPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private studentPopupService: StudentBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.studentPopupService
                    .open(StudentBliDialogComponent as Component, params['id']);
            } else {
                this.studentPopupService
                    .open(StudentBliDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
