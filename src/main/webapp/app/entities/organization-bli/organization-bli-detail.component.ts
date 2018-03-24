import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrganizationBli } from './organization-bli.model';
import { OrganizationBliService } from './organization-bli.service';

@Component({
    selector: 'jhi-organization-bli-detail',
    templateUrl: './organization-bli-detail.component.html'
})
export class OrganizationBliDetailComponent implements OnInit, OnDestroy {

    organization: OrganizationBli;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private organizationService: OrganizationBliService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrganizations();
    }

    load(id) {
        this.organizationService.find(id)
            .subscribe((organizationResponse: HttpResponse<OrganizationBli>) => {
                this.organization = organizationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrganizations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'organizationListModification',
            (response) => this.load(this.organization.id)
        );
    }
}
