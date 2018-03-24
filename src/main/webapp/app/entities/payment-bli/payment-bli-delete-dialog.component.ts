import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentBli } from './payment-bli.model';
import { PaymentBliPopupService } from './payment-bli-popup.service';
import { PaymentBliService } from './payment-bli.service';

@Component({
    selector: 'jhi-payment-bli-delete-dialog',
    templateUrl: './payment-bli-delete-dialog.component.html'
})
export class PaymentBliDeleteDialogComponent {

    payment: PaymentBli;

    constructor(
        private paymentService: PaymentBliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paymentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'paymentListModification',
                content: 'Deleted an payment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-payment-bli-delete-popup',
    template: ''
})
export class PaymentBliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentPopupService: PaymentBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.paymentPopupService
                .open(PaymentBliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
