import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrganizationBli } from './organization-bli.model';
import { OrganizationBliPopupService } from './organization-bli-popup.service';
import { OrganizationBliService } from './organization-bli.service';

@Component({
    selector: 'jhi-organization-bli-delete-dialog',
    templateUrl: './organization-bli-delete-dialog.component.html'
})
export class OrganizationBliDeleteDialogComponent {

    organization: OrganizationBli;

    constructor(
        private organizationService: OrganizationBliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.organizationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'organizationListModification',
                content: 'Deleted an organization'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-organization-bli-delete-popup',
    template: ''
})
export class OrganizationBliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organizationPopupService: OrganizationBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.organizationPopupService
                .open(OrganizationBliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
