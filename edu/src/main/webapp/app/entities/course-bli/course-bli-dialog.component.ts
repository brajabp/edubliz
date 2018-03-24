import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CourseBli } from './course-bli.model';
import { CourseBliPopupService } from './course-bli-popup.service';
import { CourseBliService } from './course-bli.service';
import { OrganizationBli, OrganizationBliService } from '../organization-bli';

@Component({
    selector: 'jhi-course-bli-dialog',
    templateUrl: './course-bli-dialog.component.html'
})
export class CourseBliDialogComponent implements OnInit {

    course: CourseBli;
    isSaving: boolean;

    organizations: OrganizationBli[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private courseService: CourseBliService,
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
        if (this.course.id !== undefined) {
            this.subscribeToSaveResponse(
                this.courseService.update(this.course));
        } else {
            this.subscribeToSaveResponse(
                this.courseService.create(this.course));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CourseBli>>) {
        result.subscribe((res: HttpResponse<CourseBli>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CourseBli) {
        this.eventManager.broadcast({ name: 'courseListModification', content: 'OK'});
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
    selector: 'jhi-course-bli-popup',
    template: ''
})
export class CourseBliPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private coursePopupService: CourseBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.coursePopupService
                    .open(CourseBliDialogComponent as Component, params['id']);
            } else {
                this.coursePopupService
                    .open(CourseBliDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
