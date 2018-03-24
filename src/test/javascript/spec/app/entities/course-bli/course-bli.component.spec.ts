/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { CourseBliComponent } from '../../../../../../main/webapp/app/entities/course-bli/course-bli.component';
import { CourseBliService } from '../../../../../../main/webapp/app/entities/course-bli/course-bli.service';
import { CourseBli } from '../../../../../../main/webapp/app/entities/course-bli/course-bli.model';

describe('Component Tests', () => {

    describe('CourseBli Management Component', () => {
        let comp: CourseBliComponent;
        let fixture: ComponentFixture<CourseBliComponent>;
        let service: CourseBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [CourseBliComponent],
                providers: [
                    CourseBliService
                ]
            })
            .overrideTemplate(CourseBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CourseBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CourseBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.courses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
