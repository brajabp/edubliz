/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { EduTestModule } from '../../../test.module';
import { ClassroomBliDialogComponent } from '../../../../../../main/webapp/app/entities/classroom-bli/classroom-bli-dialog.component';
import { ClassroomBliService } from '../../../../../../main/webapp/app/entities/classroom-bli/classroom-bli.service';
import { ClassroomBli } from '../../../../../../main/webapp/app/entities/classroom-bli/classroom-bli.model';
import { ScheduleBliService } from '../../../../../../main/webapp/app/entities/schedule-bli';

describe('Component Tests', () => {

    describe('ClassroomBli Management Dialog Component', () => {
        let comp: ClassroomBliDialogComponent;
        let fixture: ComponentFixture<ClassroomBliDialogComponent>;
        let service: ClassroomBliService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [ClassroomBliDialogComponent],
                providers: [
                    ScheduleBliService,
                    ClassroomBliService
                ]
            })
            .overrideTemplate(ClassroomBliDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassroomBliDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassroomBliService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClassroomBli(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.classroom = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'classroomListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClassroomBli();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.classroom = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'classroomListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
