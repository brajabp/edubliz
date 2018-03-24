import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { EnrollBli } from './enroll-bli.model';
import { EnrollBliService } from './enroll-bli.service';

@Injectable()
export class EnrollBliPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private enrollService: EnrollBliService

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
                this.enrollService.find(id)
                    .subscribe((enrollResponse: HttpResponse<EnrollBli>) => {
                        const enroll: EnrollBli = enrollResponse.body;
                        enroll.createDate = this.datePipe
                            .transform(enroll.createDate, 'yyyy-MM-ddTHH:mm:ss');
                        enroll.modDate = this.datePipe
                            .transform(enroll.modDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.enrollModalRef(component, enroll);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.enrollModalRef(component, new EnrollBli());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    enrollModalRef(component: Component, enroll: EnrollBli): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.enroll = enroll;
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
