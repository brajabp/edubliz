import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EnquiryBli } from './enquiry-bli.model';
import { EnquiryBliService } from './enquiry-bli.service';

@Component({
    selector: 'jhi-enquiry-bli-detail',
    templateUrl: './enquiry-bli-detail.component.html'
})
export class EnquiryBliDetailComponent implements OnInit, OnDestroy {

    enquiry: EnquiryBli;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private enquiryService: EnquiryBliService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEnquiries();
    }

    load(id) {
        this.enquiryService.find(id)
            .subscribe((enquiryResponse: HttpResponse<EnquiryBli>) => {
                this.enquiry = enquiryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEnquiries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'enquiryListModification',
            (response) => this.load(this.enquiry.id)
        );
    }
}
