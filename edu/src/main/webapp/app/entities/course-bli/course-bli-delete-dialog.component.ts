import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CourseBli } from './course-bli.model';
import { CourseBliPopupService } from './course-bli-popup.service';
import { CourseBliService } from './course-bli.service';

@Component({
    selector: 'jhi-course-bli-delete-dialog',
    templateUrl: './course-bli-delete-dialog.component.html'
})
export class CourseBliDeleteDialogComponent {

    course: CourseBli;

    constructor(
        private courseService: CourseBliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.courseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'courseListModification',
                content: 'Deleted an course'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-course-bli-delete-popup',
    template: ''
})
export class CourseBliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private coursePopupService: CourseBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.coursePopupService
                .open(CourseBliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
