import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StudentBli } from './student-bli.model';
import { StudentBliService } from './student-bli.service';

@Component({
    selector: 'jhi-student-bli-detail',
    templateUrl: './student-bli-detail.component.html'
})
export class StudentBliDetailComponent implements OnInit, OnDestroy {

    student: StudentBli;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private studentService: StudentBliService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStudents();
    }

    load(id) {
        this.studentService.find(id)
            .subscribe((studentResponse: HttpResponse<StudentBli>) => {
                this.student = studentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStudents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'studentListModification',
            (response) => this.load(this.student.id)
        );
    }
}
