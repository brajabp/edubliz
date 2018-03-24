import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { OrganizationBli } from './organization-bli.model';
import { OrganizationBliService } from './organization-bli.service';

@Injectable()
export class OrganizationBliPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private organizationService: OrganizationBliService

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
                this.organizationService.find(id)
                    .subscribe((organizationResponse: HttpResponse<OrganizationBli>) => {
                        const organization: OrganizationBli = organizationResponse.body;
                        organization.createDate = this.datePipe
                            .transform(organization.createDate, 'yyyy-MM-ddTHH:mm:ss');
                        organization.modDate = this.datePipe
                            .transform(organization.modDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.organizationModalRef(component, organization);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.organizationModalRef(component, new OrganizationBli());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    organizationModalRef(component: Component, organization: OrganizationBli): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.organization = organization;
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
