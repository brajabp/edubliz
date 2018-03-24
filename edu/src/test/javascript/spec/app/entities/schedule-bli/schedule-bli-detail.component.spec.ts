/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { ScheduleBliDetailComponent } from '../../../../../../main/webapp/app/entities/schedule-bli/schedule-bli-detail.component';
import { ScheduleBliService } from '../../../../../../main/webapp/app/entities/schedule-bli/schedule-bli.service';
import { ScheduleBli } from '../../../../../../main/webapp/app/entities/schedule-bli/schedule-bli.model';

describe('Component Tests', () => {

    describe('ScheduleBli Management Detail Component', () => {
        let comp: ScheduleBliDetailComponent;
        let fixture: ComponentFixture<ScheduleBliDetailComponent>;
        let service: ScheduleBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [ScheduleBliDetailComponent],
                providers: [
                    ScheduleBliService
                ]
            })
            .overrideTemplate(ScheduleBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScheduleBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ScheduleBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.schedule).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
