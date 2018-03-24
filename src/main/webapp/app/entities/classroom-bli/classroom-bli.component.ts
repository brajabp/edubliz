import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClassroomBli } from './classroom-bli.model';
import { ClassroomBliService } from './classroom-bli.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-classroom-bli',
    templateUrl: './classroom-bli.component.html'
})
export class ClassroomBliComponent implements OnInit, OnDestroy {
classrooms: ClassroomBli[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private classroomService: ClassroomBliService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.classroomService.query().subscribe(
            (res: HttpResponse<ClassroomBli[]>) => {
                this.classrooms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInClassrooms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ClassroomBli) {
        return item.id;
    }
    registerChangeInClassrooms() {
        this.eventSubscriber = this.eventManager.subscribe('classroomListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
