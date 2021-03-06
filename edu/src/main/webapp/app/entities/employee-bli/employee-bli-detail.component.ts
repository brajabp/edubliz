import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeeBli } from './employee-bli.model';
import { EmployeeBliService } from './employee-bli.service';

@Component({
    selector: 'jhi-employee-bli-detail',
    templateUrl: './employee-bli-detail.component.html'
})
export class EmployeeBliDetailComponent implements OnInit, OnDestroy {

    employee: EmployeeBli;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private employeeService: EmployeeBliService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmployees();
    }

    load(id) {
        this.employeeService.find(id)
            .subscribe((employeeResponse: HttpResponse<EmployeeBli>) => {
                this.employee = employeeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmployees() {
        this.eventSubscriber = this.eventManager.subscribe(
            'employeeListModification',
            (response) => this.load(this.employee.id)
        );
    }
}
