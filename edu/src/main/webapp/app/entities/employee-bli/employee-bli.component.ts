import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmployeeBli } from './employee-bli.model';
import { EmployeeBliService } from './employee-bli.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-employee-bli',
    templateUrl: './employee-bli.component.html'
})
export class EmployeeBliComponent implements OnInit, OnDestroy {
employees: EmployeeBli[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private employeeService: EmployeeBliService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.employeeService.query().subscribe(
            (res: HttpResponse<EmployeeBli[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmployees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmployeeBli) {
        return item.id;
    }
    registerChangeInEmployees() {
        this.eventSubscriber = this.eventManager.subscribe('employeeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
