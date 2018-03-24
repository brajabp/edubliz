import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StudentBli } from './student-bli.model';
import { StudentBliPopupService } from './student-bli-popup.service';
import { StudentBliService } from './student-bli.service';

@Component({
    selector: 'jhi-student-bli-delete-dialog',
    templateUrl: './student-bli-delete-dialog.component.html'
})
export class StudentBliDeleteDialogComponent {

    student: StudentBli;

    constructor(
        private studentService: StudentBliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.studentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'studentListModification',
                content: 'Deleted an student'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-student-bli-delete-popup',
    template: ''
})
export class StudentBliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private studentPopupService: StudentBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.studentPopupService
                .open(StudentBliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
