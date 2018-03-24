import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ClassLogBli } from './class-log-bli.model';
import { ClassLogBliService } from './class-log-bli.service';

@Injectable()
export class ClassLogBliPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private classLogService: ClassLogBliService

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
                this.classLogService.find(id)
                    .subscribe((classLogResponse: HttpResponse<ClassLogBli>) => {
                        const classLog: ClassLogBli = classLogResponse.body;
                        classLog.createDate = this.datePipe
                            .transform(classLog.createDate, 'yyyy-MM-ddTHH:mm:ss');
                        classLog.modDate = this.datePipe
                            .transform(classLog.modDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.classLogModalRef(component, classLog);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.classLogModalRef(component, new ClassLogBli());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    classLogModalRef(component: Component, classLog: ClassLogBli): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.classLog = classLog;
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
