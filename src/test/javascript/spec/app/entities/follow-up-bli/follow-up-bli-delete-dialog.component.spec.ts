/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { EduTestModule } from '../../../test.module';
import { FollowUpBliDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/follow-up-bli/follow-up-bli-delete-dialog.component';
import { FollowUpBliService } from '../../../../../../main/webapp/app/entities/follow-up-bli/follow-up-bli.service';

describe('Component Tests', () => {

    describe('FollowUpBli Management Delete Component', () => {
        let comp: FollowUpBliDeleteDialogComponent;
        let fixture: ComponentFixture<FollowUpBliDeleteDialogComponent>;
        let service: FollowUpBliService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [FollowUpBliDeleteDialogComponent],
                providers: [
                    FollowUpBliService
                ]
            })
            .overrideTemplate(FollowUpBliDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FollowUpBliDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FollowUpBliService);
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
