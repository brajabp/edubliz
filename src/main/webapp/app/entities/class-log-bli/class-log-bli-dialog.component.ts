import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClassLogBli } from './class-log-bli.model';
import { ClassLogBliPopupService } from './class-log-bli-popup.service';
import { ClassLogBliService } from './class-log-bli.service';
import { ClassroomBli, ClassroomBliService } from '../classroom-bli';

@Component({
    selector: 'jhi-class-log-bli-dialog',
    templateUrl: './class-log-bli-dialog.component.html'
})
export class ClassLogBliDialogComponent implements OnInit {

    classLog: ClassLogBli;
    isSaving: boolean;

    classrooms: ClassroomBli[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private classLogService: ClassLogBliService,
        private classroomService: ClassroomBliService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.classroomService.query()
            .subscribe((res: HttpResponse<ClassroomBli[]>) => { this.classrooms = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.classLog.id !== undefined) {
            this.subscribeToSaveResponse(
                this.classLogService.update(this.classLog));
        } else {
            this.subscribeToSaveResponse(
                this.classLogService.create(this.classLog));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ClassLogBli>>) {
        result.subscribe((res: HttpResponse<ClassLogBli>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ClassLogBli) {
        this.eventManager.broadcast({ name: 'classLogListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClassroomById(index: number, item: ClassroomBli) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-class-log-bli-popup',
    template: ''
})
export class ClassLogBliPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classLogPopupService: ClassLogBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.classLogPopupService
                    .open(ClassLogBliDialogComponent as Component, params['id']);
            } else {
                this.classLogPopupService
                    .open(ClassLogBliDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
