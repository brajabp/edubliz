import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrganizationBli } from './organization-bli.model';
import { OrganizationBliPopupService } from './organization-bli-popup.service';
import { OrganizationBliService } from './organization-bli.service';

@Component({
    selector: 'jhi-organization-bli-dialog',
    templateUrl: './organization-bli-dialog.component.html'
})
export class OrganizationBliDialogComponent implements OnInit {

    organization: OrganizationBli;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private organizationService: OrganizationBliService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.organization.id !== undefined) {
            this.subscribeToSaveResponse(
                this.organizationService.update(this.organization));
        } else {
            this.subscribeToSaveResponse(
                this.organizationService.create(this.organization));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrganizationBli>>) {
        result.subscribe((res: HttpResponse<OrganizationBli>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrganizationBli) {
        this.eventManager.broadcast({ name: 'organizationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-organization-bli-popup',
    template: ''
})
export class OrganizationBliPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organizationPopupService: OrganizationBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.organizationPopupService
                    .open(OrganizationBliDialogComponent as Component, params['id']);
            } else {
                this.organizationPopupService
                    .open(OrganizationBliDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
