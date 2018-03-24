import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FollowUpBli } from './follow-up-bli.model';
import { FollowUpBliPopupService } from './follow-up-bli-popup.service';
import { FollowUpBliService } from './follow-up-bli.service';

@Component({
    selector: 'jhi-follow-up-bli-delete-dialog',
    templateUrl: './follow-up-bli-delete-dialog.component.html'
})
export class FollowUpBliDeleteDialogComponent {

    followUp: FollowUpBli;

    constructor(
        private followUpService: FollowUpBliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.followUpService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'followUpListModification',
                content: 'Deleted an followUp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-follow-up-bli-delete-popup',
    template: ''
})
export class FollowUpBliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private followUpPopupService: FollowUpBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.followUpPopupService
                .open(FollowUpBliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
