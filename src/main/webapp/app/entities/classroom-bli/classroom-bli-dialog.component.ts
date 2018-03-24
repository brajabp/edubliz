import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClassroomBli } from './classroom-bli.model';
import { ClassroomBliPopupService } from './classroom-bli-popup.service';
import { ClassroomBliService } from './classroom-bli.service';
import { ScheduleBli, ScheduleBliService } from '../schedule-bli';

@Component({
    selector: 'jhi-classroom-bli-dialog',
    templateUrl: './classroom-bli-dialog.component.html'
})
export class ClassroomBliDialogComponent implements OnInit {

    classroom: ClassroomBli;
    isSaving: boolean;

    schedules: ScheduleBli[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private classroomService: ClassroomBliService,
        private scheduleService: ScheduleBliService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.scheduleService.query()
            .subscribe((res: HttpResponse<ScheduleBli[]>) => { this.schedules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.classroom.id !== undefined) {
            this.subscribeToSaveResponse(
                this.classroomService.update(this.classroom));
        } else {
            this.subscribeToSaveResponse(
                this.classroomService.create(this.classroom));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ClassroomBli>>) {
        result.subscribe((res: HttpResponse<ClassroomBli>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ClassroomBli) {
        this.eventManager.broadcast({ name: 'classroomListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackScheduleById(index: number, item: ScheduleBli) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-classroom-bli-popup',
    template: ''
})
export class ClassroomBliPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classroomPopupService: ClassroomBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.classroomPopupService
                    .open(ClassroomBliDialogComponent as Component, params['id']);
            } else {
                this.classroomPopupService
                    .open(ClassroomBliDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
