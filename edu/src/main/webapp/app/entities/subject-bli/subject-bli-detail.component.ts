import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SubjectBli } from './subject-bli.model';
import { SubjectBliService } from './subject-bli.service';

@Component({
    selector: 'jhi-subject-bli-detail',
    templateUrl: './subject-bli-detail.component.html'
})
export class SubjectBliDetailComponent implements OnInit, OnDestroy {

    subject: SubjectBli;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private subjectService: SubjectBliService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSubjects();
    }

    load(id) {
        this.subjectService.find(id)
            .subscribe((subjectResponse: HttpResponse<SubjectBli>) => {
                this.subject = subjectResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSubjects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'subjectListModification',
            (response) => this.load(this.subject.id)
        );
    }
}
