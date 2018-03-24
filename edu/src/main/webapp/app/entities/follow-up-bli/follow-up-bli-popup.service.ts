import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FollowUpBli } from './follow-up-bli.model';
import { FollowUpBliService } from './follow-up-bli.service';

@Injectable()
export class FollowUpBliPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private followUpService: FollowUpBliService

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
                this.followUpService.find(id)
                    .subscribe((followUpResponse: HttpResponse<FollowUpBli>) => {
                        const followUp: FollowUpBli = followUpResponse.body;
                        followUp.followUpDate = this.datePipe
                            .transform(followUp.followUpDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.followUpModalRef(component, followUp);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.followUpModalRef(component, new FollowUpBli());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    followUpModalRef(component: Component, followUp: FollowUpBli): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.followUp = followUp;
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
