/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { BatchBliDetailComponent } from '../../../../../../main/webapp/app/entities/batch-bli/batch-bli-detail.component';
import { BatchBliService } from '../../../../../../main/webapp/app/entities/batch-bli/batch-bli.service';
import { BatchBli } from '../../../../../../main/webapp/app/entities/batch-bli/batch-bli.model';

describe('Component Tests', () => {

    describe('BatchBli Management Detail Component', () => {
        let comp: BatchBliDetailComponent;
        let fixture: ComponentFixture<BatchBliDetailComponent>;
        let service: BatchBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [BatchBliDetailComponent],
                providers: [
                    BatchBliService
                ]
            })
            .overrideTemplate(BatchBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BatchBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BatchBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BatchBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.batch).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
