/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { EduTestModule } from '../../../test.module';
import { EnquiryBliDialogComponent } from '../../../../../../main/webapp/app/entities/enquiry-bli/enquiry-bli-dialog.component';
import { EnquiryBliService } from '../../../../../../main/webapp/app/entities/enquiry-bli/enquiry-bli.service';
import { EnquiryBli } from '../../../../../../main/webapp/app/entities/enquiry-bli/enquiry-bli.model';
import { OrganizationBliService } from '../../../../../../main/webapp/app/entities/organization-bli';
import { StudentBliService } from '../../../../../../main/webapp/app/entities/student-bli';

describe('Component Tests', () => {

    describe('EnquiryBli Management Dialog Component', () => {
        let comp: EnquiryBliDialogComponent;
        let fixture: ComponentFixture<EnquiryBliDialogComponent>;
        let service: EnquiryBliService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [EnquiryBliDialogComponent],
                providers: [
                    OrganizationBliService,
                    StudentBliService,
                    EnquiryBliService
                ]
            })
            .overrideTemplate(EnquiryBliDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnquiryBliDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnquiryBliService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EnquiryBli(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.enquiry = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enquiryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EnquiryBli();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.enquiry = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enquiryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
