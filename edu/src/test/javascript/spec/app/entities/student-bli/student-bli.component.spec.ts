/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { StudentBliComponent } from '../../../../../../main/webapp/app/entities/student-bli/student-bli.component';
import { StudentBliService } from '../../../../../../main/webapp/app/entities/student-bli/student-bli.service';
import { StudentBli } from '../../../../../../main/webapp/app/entities/student-bli/student-bli.model';

describe('Component Tests', () => {

    describe('StudentBli Management Component', () => {
        let comp: StudentBliComponent;
        let fixture: ComponentFixture<StudentBliComponent>;
        let service: StudentBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [StudentBliComponent],
                providers: [
                    StudentBliService
                ]
            })
            .overrideTemplate(StudentBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudentBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StudentBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.students[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
