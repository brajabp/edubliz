/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { EduTestModule } from '../../../test.module';
import { BatchBliDialogComponent } from '../../../../../../main/webapp/app/entities/batch-bli/batch-bli-dialog.component';
import { BatchBliService } from '../../../../../../main/webapp/app/entities/batch-bli/batch-bli.service';
import { BatchBli } from '../../../../../../main/webapp/app/entities/batch-bli/batch-bli.model';
import { SubjectBliService } from '../../../../../../main/webapp/app/entities/subject-bli';
import { StudentBliService } from '../../../../../../main/webapp/app/entities/student-bli';
import { EmployeeBliService } from '../../../../../../main/webapp/app/entities/employee-bli';

describe('Component Tests', () => {

    describe('BatchBli Management Dialog Component', () => {
        let comp: BatchBliDialogComponent;
        let fixture: ComponentFixture<BatchBliDialogComponent>;
        let service: BatchBliService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [BatchBliDialogComponent],
                providers: [
                    SubjectBliService,
                    StudentBliService,
                    EmployeeBliService,
                    BatchBliService
                ]
            })
            .overrideTemplate(BatchBliDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BatchBliDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BatchBliService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BatchBli(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.batch = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'batchListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BatchBli();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.batch = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'batchListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
