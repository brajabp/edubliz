import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BatchBli } from './batch-bli.model';
import { BatchBliService } from './batch-bli.service';

@Injectable()
export class BatchBliPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private batchService: BatchBliService

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
                this.batchService.find(id)
                    .subscribe((batchResponse: HttpResponse<BatchBli>) => {
                        const batch: BatchBli = batchResponse.body;
                        batch.createDate = this.datePipe
                            .transform(batch.createDate, 'yyyy-MM-ddTHH:mm:ss');
                        batch.modDate = this.datePipe
                            .transform(batch.modDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.batchModalRef(component, batch);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.batchModalRef(component, new BatchBli());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    batchModalRef(component: Component, batch: BatchBli): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.batch = batch;
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
