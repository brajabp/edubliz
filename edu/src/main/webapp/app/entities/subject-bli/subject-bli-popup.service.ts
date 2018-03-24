import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SubjectBli } from './subject-bli.model';
import { SubjectBliService } from './subject-bli.service';

@Injectable()
export class SubjectBliPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private subjectService: SubjectBliService

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
                this.subjectService.find(id)
                    .subscribe((subjectResponse: HttpResponse<SubjectBli>) => {
                        const subject: SubjectBli = subjectResponse.body;
                        subject.createDate = this.datePipe
                            .transform(subject.createDate, 'yyyy-MM-ddTHH:mm:ss');
                        subject.modDate = this.datePipe
                            .transform(subject.modDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.subjectModalRef(component, subject);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.subjectModalRef(component, new SubjectBli());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    subjectModalRef(component: Component, subject: SubjectBli): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.subject = subject;
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
