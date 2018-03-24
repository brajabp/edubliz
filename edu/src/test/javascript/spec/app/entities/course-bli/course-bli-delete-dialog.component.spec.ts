/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { EduTestModule } from '../../../test.module';
import { CourseBliDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/course-bli/course-bli-delete-dialog.component';
import { CourseBliService } from '../../../../../../main/webapp/app/entities/course-bli/course-bli.service';

describe('Component Tests', () => {

    describe('CourseBli Management Delete Component', () => {
        let comp: CourseBliDeleteDialogComponent;
        let fixture: ComponentFixture<CourseBliDeleteDialogComponent>;
        let service: CourseBliService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [CourseBliDeleteDialogComponent],
                providers: [
                    CourseBliService
                ]
            })
            .overrideTemplate(CourseBliDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CourseBliDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseBliService);
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
