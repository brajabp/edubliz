import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DivisionBli } from './division-bli.model';
import { DivisionBliService } from './division-bli.service';

@Injectable()
export class DivisionBliPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private divisionService: DivisionBliService

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
                this.divisionService.find(id)
                    .subscribe((divisionResponse: HttpResponse<DivisionBli>) => {
                        const division: DivisionBli = divisionResponse.body;
                        division.createDate = this.datePipe
                            .transform(division.createDate, 'yyyy-MM-ddTHH:mm:ss');
                        division.modDate = this.datePipe
                            .transform(division.modDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.divisionModalRef(component, division);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.divisionModalRef(component, new DivisionBli());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    divisionModalRef(component: Component, division: DivisionBli): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.division = division;
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
