import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ClassroomBli } from './classroom-bli.model';
import { ClassroomBliService } from './classroom-bli.service';

@Component({
    selector: 'jhi-classroom-bli-detail',
    templateUrl: './classroom-bli-detail.component.html'
})
export class ClassroomBliDetailComponent implements OnInit, OnDestroy {

    classroom: ClassroomBli;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private classroomService: ClassroomBliService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClassrooms();
    }

    load(id) {
        this.classroomService.find(id)
            .subscribe((classroomResponse: HttpResponse<ClassroomBli>) => {
                this.classroom = classroomResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClassrooms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'classroomListModification',
            (response) => this.load(this.classroom.id)
        );
    }
}
