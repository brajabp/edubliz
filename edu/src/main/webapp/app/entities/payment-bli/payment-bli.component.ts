import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PaymentBli } from './payment-bli.model';
import { PaymentBliService } from './payment-bli.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-payment-bli',
    templateUrl: './payment-bli.component.html'
})
export class PaymentBliComponent implements OnInit, OnDestroy {
payments: PaymentBli[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private paymentService: PaymentBliService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.paymentService.query().subscribe(
            (res: HttpResponse<PaymentBli[]>) => {
                this.payments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPayments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PaymentBli) {
        return item.id;
    }
    registerChangeInPayments() {
        this.eventSubscriber = this.eventManager.subscribe('paymentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
