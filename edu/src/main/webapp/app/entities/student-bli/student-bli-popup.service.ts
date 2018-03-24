import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { StudentBli } from './student-bli.model';
import { StudentBliService } from './student-bli.service';

@Injectable()
export class StudentBliPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private studentService: StudentBliService

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
                this.studentService.find(id)
                    .subscribe((studentResponse: HttpResponse<StudentBli>) => {
                        const student: StudentBli = studentResponse.body;
                        student.createDate = this.datePipe
                            .transform(student.createDate, 'yyyy-MM-ddTHH:mm:ss');
                        student.modDate = this.datePipe
                            .transform(student.modDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.studentModalRef(component, student);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.studentModalRef(component, new StudentBli());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    studentModalRef(component: Component, student: StudentBli): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.student = student;
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
