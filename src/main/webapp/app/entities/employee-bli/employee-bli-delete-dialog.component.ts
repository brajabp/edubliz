import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeeBli } from './employee-bli.model';
import { EmployeeBliPopupService } from './employee-bli-popup.service';
import { EmployeeBliService } from './employee-bli.service';

@Component({
    selector: 'jhi-employee-bli-delete-dialog',
    templateUrl: './employee-bli-delete-dialog.component.html'
})
export class EmployeeBliDeleteDialogComponent {

    employee: EmployeeBli;

    constructor(
        private employeeService: EmployeeBliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employeeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'employeeListModification',
                content: 'Deleted an employee'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employee-bli-delete-popup',
    template: ''
})
export class EmployeeBliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeePopupService: EmployeeBliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.employeePopupService
                .open(EmployeeBliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
