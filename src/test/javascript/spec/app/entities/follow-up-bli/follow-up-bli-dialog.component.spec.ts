/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { EduTestModule } from '../../../test.module';
import { FollowUpBliDialogComponent } from '../../../../../../main/webapp/app/entities/follow-up-bli/follow-up-bli-dialog.component';
import { FollowUpBliService } from '../../../../../../main/webapp/app/entities/follow-up-bli/follow-up-bli.service';
import { FollowUpBli } from '../../../../../../main/webapp/app/entities/follow-up-bli/follow-up-bli.model';
import { EnquiryBliService } from '../../../../../../main/webapp/app/entities/enquiry-bli';
import { EmployeeBliService } from '../../../../../../main/webapp/app/entities/employee-bli';

describe('Component Tests', () => {

    describe('FollowUpBli Management Dialog Component', () => {
        let comp: FollowUpBliDialogComponent;
        let fixture: ComponentFixture<FollowUpBliDialogComponent>;
        let service: FollowUpBliService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [FollowUpBliDialogComponent],
                providers: [
                    EnquiryBliService,
                    EmployeeBliService,
                    FollowUpBliService
                ]
            })
            .overrideTemplate(FollowUpBliDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FollowUpBliDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FollowUpBliService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FollowUpBli(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.followUp = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'followUpListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FollowUpBli();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.followUp = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'followUpListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
