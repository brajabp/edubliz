import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DivisionBli } from './division-bli.model';
import { DivisionBliPopupService } from './division-bli-popup.service';
import { DivisionBliService } from './division-bli.service';

@Component({
    selector: 'jhi-division-bli-delete-dialog',
    templateUrl: './division-bli-delete-dialog.component.html'
})
export class DivisionBliDeleteDialogComponent {

    division: DivisionBli;

    constructor(
        private divisionService: DivisionBliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.divisionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'divisionListModification',
                content: 'Deleted an division'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-division-bli-delete-popup',
    template: ''
})
export class DivisionBliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private divisionPopupService: DivisionBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.divisionPopupService
                .open(DivisionBliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
