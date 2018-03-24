/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { EduTestModule } from '../../../test.module';
import { EnquiryBliDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/enquiry-bli/enquiry-bli-delete-dialog.component';
import { EnquiryBliService } from '../../../../../../main/webapp/app/entities/enquiry-bli/enquiry-bli.service';

describe('Component Tests', () => {

    describe('EnquiryBli Management Delete Component', () => {
        let comp: EnquiryBliDeleteDialogComponent;
        let fixture: ComponentFixture<EnquiryBliDeleteDialogComponent>;
        let service: EnquiryBliService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [EnquiryBliDeleteDialogComponent],
                providers: [
                    EnquiryBliService
                ]
            })
            .overrideTemplate(EnquiryBliDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnquiryBliDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnquiryBliService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
