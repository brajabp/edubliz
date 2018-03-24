import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EnrollBli } from './enroll-bli.model';
import { EnrollBliPopupService } from './enroll-bli-popup.service';
import { EnrollBliService } from './enroll-bli.service';
import { CourseBli, CourseBliService } from '../course-bli';
import { StudentBli, StudentBliService } from '../student-bli';
import { BatchBli, BatchBliService } from '../batch-bli';

@Component({
    selector: 'jhi-enroll-bli-dialog',
    templateUrl: './enroll-bli-dialog.component.html'
})
export class EnrollBliDialogComponent implements OnInit {

    enroll: EnrollBli;
    isSaving: boolean;

    courses: CourseBli[];

    students: StudentBli[];

    batches: BatchBli[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private enrollService: EnrollBliService,
        private courseService: CourseBliService,
        private studentService: StudentBliService,
        private batchService: BatchBliService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.courseService.query()
            .subscribe((res: HttpResponse<CourseBli[]>) => { this.courses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.studentService.query()
            .subscribe((res: HttpResponse<StudentBli[]>) => { this.students = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.batchService.query()
            .subscribe((res: HttpResponse<BatchBli[]>) => { this.batches = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.enroll.id !== undefined) {
            this.subscribeToSaveResponse(
                this.enrollService.update(this.enroll));
        } else {
            this.subscribeToSaveResponse(
                this.enrollService.create(this.enroll));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EnrollBli>>) {
        result.subscribe((res: HttpResponse<EnrollBli>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EnrollBli) {
        this.eventManager.broadcast({ name: 'enrollListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCourseById(index: number, item: CourseBli) {
        return item.id;
    }

    trackStudentById(index: number, item: StudentBli) {
        return item.id;
    }

    trackBatchById(index: number, item: BatchBli) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-enroll-bli-popup',
    template: ''
})
export class EnrollBliPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enrollPopupService: EnrollBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.enrollPopupService
                    .open(EnrollBliDialogComponent as Component, params['id']);
            } else {
                this.enrollPopupService
                    .open(EnrollBliDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
