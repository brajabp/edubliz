import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrganizationBli } from './organization-bli.model';
import { OrganizationBliService } from './organization-bli.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-organization-bli',
    templateUrl: './organization-bli.component.html'
})
export class OrganizationBliComponent implements OnInit, OnDestroy {
organizations: OrganizationBli[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private organizationService: OrganizationBliService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.organizationService.query().subscribe(
            (res: HttpResponse<OrganizationBli[]>) => {
                this.organizations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOrganizations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OrganizationBli) {
        return item.id;
    }
    registerChangeInOrganizations() {
        this.eventSubscriber = this.eventManager.subscribe('organizationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
