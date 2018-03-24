import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BatchBli } from './batch-bli.model';
import { BatchBliPopupService } from './batch-bli-popup.service';
import { BatchBliService } from './batch-bli.service';

@Component({
    selector: 'jhi-batch-bli-delete-dialog',
    templateUrl: './batch-bli-delete-dialog.component.html'
})
export class BatchBliDeleteDialogComponent {

    batch: BatchBli;

    constructor(
        private batchService: BatchBliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.batchService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'batchListModification',
                content: 'Deleted an batch'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-batch-bli-delete-popup',
    template: ''
})
export class BatchBliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private batchPopupService: BatchBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.batchPopupService
                .open(BatchBliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
