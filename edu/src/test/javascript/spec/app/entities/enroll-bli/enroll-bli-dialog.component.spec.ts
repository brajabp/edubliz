/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { EduTestModule } from '../../../test.module';
import { EnrollBliDialogComponent } from '../../../../../../main/webapp/app/entities/enroll-bli/enroll-bli-dialog.component';
import { EnrollBliService } from '../../../../../../main/webapp/app/entities/enroll-bli/enroll-bli.service';
import { EnrollBli } from '../../../../../../main/webapp/app/entities/enroll-bli/enroll-bli.model';
import { CourseBliService } from '../../../../../../main/webapp/app/entities/course-bli';
import { StudentBliService } from '../../../../../../main/webapp/app/entities/student-bli';
import { BatchBliService } from '../../../../../../main/webapp/app/entities/batch-bli';

describe('Component Tests', () => {

    describe('EnrollBli Management Dialog Component', () => {
        let comp: EnrollBliDialogComponent;
        let fixture: ComponentFixture<EnrollBliDialogComponent>;
        let service: EnrollBliService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [EnrollBliDialogComponent],
                providers: [
                    CourseBliService,
                    StudentBliService,
                    BatchBliService,
                    EnrollBliService
                ]
            })
            .overrideTemplate(EnrollBliDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnrollBliDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnrollBliService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EnrollBli(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.enroll = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enrollListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EnrollBli();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.enroll = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enrollListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
