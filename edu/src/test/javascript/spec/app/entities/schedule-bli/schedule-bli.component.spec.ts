/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { ScheduleBliComponent } from '../../../../../../main/webapp/app/entities/schedule-bli/schedule-bli.component';
import { ScheduleBliService } from '../../../../../../main/webapp/app/entities/schedule-bli/schedule-bli.service';
import { ScheduleBli } from '../../../../../../main/webapp/app/entities/schedule-bli/schedule-bli.model';

describe('Component Tests', () => {

    describe('ScheduleBli Management Component', () => {
        let comp: ScheduleBliComponent;
        let fixture: ComponentFixture<ScheduleBliComponent>;
        let service: ScheduleBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [ScheduleBliComponent],
                providers: [
                    ScheduleBliService
                ]
            })
            .overrideTemplate(ScheduleBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScheduleBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ScheduleBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.schedules[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
