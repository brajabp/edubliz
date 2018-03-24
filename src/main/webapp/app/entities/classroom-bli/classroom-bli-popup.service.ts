import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ClassroomBli } from './classroom-bli.model';
import { ClassroomBliService } from './classroom-bli.service';

@Injectable()
export class ClassroomBliPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private classroomService: ClassroomBliService

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
                this.classroomService.find(id)
                    .subscribe((classroomResponse: HttpResponse<ClassroomBli>) => {
                        const classroom: ClassroomBli = classroomResponse.body;
                        classroom.createDate = this.datePipe
                            .transform(classroom.createDate, 'yyyy-MM-ddTHH:mm:ss');
                        classroom.modDate = this.datePipe
                            .transform(classroom.modDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.classroomModalRef(component, classroom);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.classroomModalRef(component, new ClassroomBli());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    classroomModalRef(component: Component, classroom: ClassroomBli): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.classroom = classroom;
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
