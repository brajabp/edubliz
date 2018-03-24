import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DivisionBli } from './division-bli.model';
import { DivisionBliPopupService } from './division-bli-popup.service';
import { DivisionBliService } from './division-bli.service';
import { OrganizationBli, OrganizationBliService } from '../organization-bli';

@Component({
    selector: 'jhi-division-bli-dialog',
    templateUrl: './division-bli-dialog.component.html'
})
export class DivisionBliDialogComponent implements OnInit {

    division: DivisionBli;
    isSaving: boolean;

    organizations: OrganizationBli[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private divisionService: DivisionBliService,
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
        if (this.division.id !== undefined) {
            this.subscribeToSaveResponse(
                this.divisionService.update(this.division));
        } else {
            this.subscribeToSaveResponse(
                this.divisionService.create(this.division));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DivisionBli>>) {
        result.subscribe((res: HttpResponse<DivisionBli>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DivisionBli) {
        this.eventManager.broadcast({ name: 'divisionListModification', content: 'OK'});
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
    selector: 'jhi-division-bli-popup',
    template: ''
})
export class DivisionBliPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private divisionPopupService: DivisionBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.divisionPopupService
                    .open(DivisionBliDialogComponent as Component, params['id']);
            } else {
                this.divisionPopupService
                    .open(DivisionBliDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
