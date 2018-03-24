import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PaymentBli } from './payment-bli.model';
import { PaymentBliService } from './payment-bli.service';

@Injectable()
export class PaymentBliPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private paymentService: PaymentBliService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.paymentService.find(id)
                    .subscribe((paymentResponse: HttpResponse<PaymentBli>) => {
                        const payment: PaymentBli = paymentResponse.body;
                        payment.createDate = this.datePipe
                            .transform(payment.createDate, 'yyyy-MM-ddTHH:mm:ss');
                        payment.modDate = this.datePipe
                            .transform(payment.modDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.paymentModalRef(component, payment);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.paymentModalRef(component, new PaymentBli());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    paymentModalRef(component: Component, payment: PaymentBli): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.payment = payment;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
