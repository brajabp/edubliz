import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ScheduleBli } from './schedule-bli.model';
import { ScheduleBliService } from './schedule-bli.service';

@Injectable()
export class ScheduleBliPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scheduleService: ScheduleBliService

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
                this.scheduleService.find(id)
                    .subscribe((scheduleResponse: HttpResponse<ScheduleBli>) => {
                        const schedule: ScheduleBli = scheduleResponse.body;
                        schedule.createDate = this.datePipe
                            .transform(schedule.createDate, 'yyyy-MM-ddTHH:mm:ss');
                        schedule.modDate = this.datePipe
                            .transform(schedule.modDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.scheduleModalRef(component, schedule);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.scheduleModalRef(component, new ScheduleBli());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    scheduleModalRef(component: Component, schedule: ScheduleBli): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.schedule = schedule;
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
