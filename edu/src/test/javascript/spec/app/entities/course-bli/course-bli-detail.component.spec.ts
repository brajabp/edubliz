/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { CourseBliDetailComponent } from '../../../../../../main/webapp/app/entities/course-bli/course-bli-detail.component';
import { CourseBliService } from '../../../../../../main/webapp/app/entities/course-bli/course-bli.service';
import { CourseBli } from '../../../../../../main/webapp/app/entities/course-bli/course-bli.model';

describe('Component Tests', () => {

    describe('CourseBli Management Detail Component', () => {
        let comp: CourseBliDetailComponent;
        let fixture: ComponentFixture<CourseBliDetailComponent>;
        let service: CourseBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [CourseBliDetailComponent],
                providers: [
                    CourseBliService
                ]
            })
            .overrideTemplate(CourseBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CourseBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CourseBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.course).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
