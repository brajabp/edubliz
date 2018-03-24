import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EnrollBli } from './enroll-bli.model';
import { EnrollBliPopupService } from './enroll-bli-popup.service';
import { EnrollBliService } from './enroll-bli.service';

@Component({
    selector: 'jhi-enroll-bli-delete-dialog',
    templateUrl: './enroll-bli-delete-dialog.component.html'
})
export class EnrollBliDeleteDialogComponent {

    enroll: EnrollBli;

    constructor(
        private enrollService: EnrollBliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enrollService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'enrollListModification',
                content: 'Deleted an enroll'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-enroll-bli-delete-popup',
    template: ''
})
export class EnrollBliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enrollPopupService: EnrollBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.enrollPopupService
                .open(EnrollBliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
