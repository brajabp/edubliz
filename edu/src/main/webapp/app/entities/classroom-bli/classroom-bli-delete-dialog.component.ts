import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClassroomBli } from './classroom-bli.model';
import { ClassroomBliPopupService } from './classroom-bli-popup.service';
import { ClassroomBliService } from './classroom-bli.service';

@Component({
    selector: 'jhi-classroom-bli-delete-dialog',
    templateUrl: './classroom-bli-delete-dialog.component.html'
})
export class ClassroomBliDeleteDialogComponent {

    classroom: ClassroomBli;

    constructor(
        private classroomService: ClassroomBliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.classroomService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'classroomListModification',
                content: 'Deleted an classroom'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-classroom-bli-delete-popup',
    template: ''
})
export class ClassroomBliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classroomPopupService: ClassroomBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.classroomPopupService
                .open(ClassroomBliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
