import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClassLogBli } from './class-log-bli.model';
import { ClassLogBliPopupService } from './class-log-bli-popup.service';
import { ClassLogBliService } from './class-log-bli.service';

@Component({
    selector: 'jhi-class-log-bli-delete-dialog',
    templateUrl: './class-log-bli-delete-dialog.component.html'
})
export class ClassLogBliDeleteDialogComponent {

    classLog: ClassLogBli;

    constructor(
        private classLogService: ClassLogBliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.classLogService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'classLogListModification',
                content: 'Deleted an classLog'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-class-log-bli-delete-popup',
    template: ''
})
export class ClassLogBliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classLogPopupService: ClassLogBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.classLogPopupService
                .open(ClassLogBliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
