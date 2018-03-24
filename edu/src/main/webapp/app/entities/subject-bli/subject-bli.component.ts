import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubjectBli } from './subject-bli.model';
import { SubjectBliService } from './subject-bli.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-subject-bli',
    templateUrl: './subject-bli.component.html'
})
export class SubjectBliComponent implements OnInit, OnDestroy {
subjects: SubjectBli[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private subjectService: SubjectBliService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.subjectService.query().subscribe(
            (res: HttpResponse<SubjectBli[]>) => {
                this.subjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSubjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SubjectBli) {
        return item.id;
    }
    registerChangeInSubjects() {
        this.eventSubscriber = this.eventManager.subscribe('subjectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
