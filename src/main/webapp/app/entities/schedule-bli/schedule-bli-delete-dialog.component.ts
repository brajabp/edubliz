import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ScheduleBli } from './schedule-bli.model';
import { ScheduleBliPopupService } from './schedule-bli-popup.service';
import { ScheduleBliService } from './schedule-bli.service';

@Component({
    selector: 'jhi-schedule-bli-delete-dialog',
    templateUrl: './schedule-bli-delete-dialog.component.html'
})
export class ScheduleBliDeleteDialogComponent {

    schedule: ScheduleBli;

    constructor(
        private scheduleService: ScheduleBliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scheduleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scheduleListModification',
                content: 'Deleted an schedule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-schedule-bli-delete-popup',
    template: ''
})
export class ScheduleBliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schedulePopupService: ScheduleBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.schedulePopupService
                .open(ScheduleBliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
