import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BatchBli } from './batch-bli.model';
import { BatchBliPopupService } from './batch-bli-popup.service';
import { BatchBliService } from './batch-bli.service';
import { SubjectBli, SubjectBliService } from '../subject-bli';
import { StudentBli, StudentBliService } from '../student-bli';
import { EmployeeBli, EmployeeBliService } from '../employee-bli';

@Component({
    selector: 'jhi-batch-bli-dialog',
    templateUrl: './batch-bli-dialog.component.html'
})
export class BatchBliDialogComponent implements OnInit {

    batch: BatchBli;
    isSaving: boolean;

    subjects: SubjectBli[];

    students: StudentBli[];

    employees: EmployeeBli[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private batchService: BatchBliService,
        private subjectService: SubjectBliService,
        private studentService: StudentBliService,
        private employeeService: EmployeeBliService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.subjectService.query()
            .subscribe((res: HttpResponse<SubjectBli[]>) => { this.subjects = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.studentService.query()
            .subscribe((res: HttpResponse<StudentBli[]>) => { this.students = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.employeeService.query()
            .subscribe((res: HttpResponse<EmployeeBli[]>) => { this.employees = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.batch.id !== undefined) {
            this.subscribeToSaveResponse(
                this.batchService.update(this.batch));
        } else {
            this.subscribeToSaveResponse(
                this.batchService.create(this.batch));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BatchBli>>) {
        result.subscribe((res: HttpResponse<BatchBli>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BatchBli) {
        this.eventManager.broadcast({ name: 'batchListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSubjectById(index: number, item: SubjectBli) {
        return item.id;
    }

    trackStudentById(index: number, item: StudentBli) {
        return item.id;
    }

    trackEmployeeById(index: number, item: EmployeeBli) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-batch-bli-popup',
    template: ''
})
export class BatchBliPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private batchPopupService: BatchBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.batchPopupService
                    .open(BatchBliDialogComponent as Component, params['id']);
            } else {
                this.batchPopupService
                    .open(BatchBliDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
