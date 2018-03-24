/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { BatchBliComponent } from '../../../../../../main/webapp/app/entities/batch-bli/batch-bli.component';
import { BatchBliService } from '../../../../../../main/webapp/app/entities/batch-bli/batch-bli.service';
import { BatchBli } from '../../../../../../main/webapp/app/entities/batch-bli/batch-bli.model';

describe('Component Tests', () => {

    describe('BatchBli Management Component', () => {
        let comp: BatchBliComponent;
        let fixture: ComponentFixture<BatchBliComponent>;
        let service: BatchBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [BatchBliComponent],
                providers: [
                    BatchBliService
                ]
            })
            .overrideTemplate(BatchBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BatchBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BatchBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BatchBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.batches[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
