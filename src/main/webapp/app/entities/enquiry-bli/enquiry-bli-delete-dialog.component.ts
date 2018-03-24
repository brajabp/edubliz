import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EnquiryBli } from './enquiry-bli.model';
import { EnquiryBliPopupService } from './enquiry-bli-popup.service';
import { EnquiryBliService } from './enquiry-bli.service';

@Component({
    selector: 'jhi-enquiry-bli-delete-dialog',
    templateUrl: './enquiry-bli-delete-dialog.component.html'
})
export class EnquiryBliDeleteDialogComponent {

    enquiry: EnquiryBli;

    constructor(
        private enquiryService: EnquiryBliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enquiryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'enquiryListModification',
                content: 'Deleted an enquiry'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-enquiry-bli-delete-popup',
    template: ''
})
export class EnquiryBliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enquiryPopupService: EnquiryBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.enquiryPopupService
                .open(EnquiryBliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
