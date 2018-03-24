import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CourseBli } from './course-bli.model';
import { CourseBliService } from './course-bli.service';

@Injectable()
export class CourseBliPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private courseService: CourseBliService

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
                this.courseService.find(id)
                    .subscribe((courseResponse: HttpResponse<CourseBli>) => {
                        const course: CourseBli = courseResponse.body;
                        course.createDate = this.datePipe
                            .transform(course.createDate, 'yyyy-MM-ddTHH:mm:ss');
                        course.modDate = this.datePipe
                            .transform(course.modDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.courseModalRef(component, course);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.courseModalRef(component, new CourseBli());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    courseModalRef(component: Component, course: CourseBli): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.course = course;
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
