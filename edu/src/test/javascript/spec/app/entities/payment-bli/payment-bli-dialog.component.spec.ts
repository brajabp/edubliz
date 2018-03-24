/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { EduTestModule } from '../../../test.module';
import { PaymentBliDialogComponent } from '../../../../../../main/webapp/app/entities/payment-bli/payment-bli-dialog.component';
import { PaymentBliService } from '../../../../../../main/webapp/app/entities/payment-bli/payment-bli.service';
import { PaymentBli } from '../../../../../../main/webapp/app/entities/payment-bli/payment-bli.model';
import { OrganizationBliService } from '../../../../../../main/webapp/app/entities/organization-bli';
import { EnrollBliService } from '../../../../../../main/webapp/app/entities/enroll-bli';

describe('Component Tests', () => {

    describe('PaymentBli Management Dialog Component', () => {
        let comp: PaymentBliDialogComponent;
        let fixture: ComponentFixture<PaymentBliDialogComponent>;
        let service: PaymentBliService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [PaymentBliDialogComponent],
                providers: [
                    OrganizationBliService,
                    EnrollBliService,
                    PaymentBliService
                ]
            })
            .overrideTemplate(PaymentBliDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentBliDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentBliService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PaymentBli(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.payment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'paymentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PaymentBli();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.payment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'paymentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
