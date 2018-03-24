/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { StudentBliDetailComponent } from '../../../../../../main/webapp/app/entities/student-bli/student-bli-detail.component';
import { StudentBliService } from '../../../../../../main/webapp/app/entities/student-bli/student-bli.service';
import { StudentBli } from '../../../../../../main/webapp/app/entities/student-bli/student-bli.model';

describe('Component Tests', () => {

    describe('StudentBli Management Detail Component', () => {
        let comp: StudentBliDetailComponent;
        let fixture: ComponentFixture<StudentBliDetailComponent>;
        let service: StudentBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [StudentBliDetailComponent],
                providers: [
                    StudentBliService
                ]
            })
            .overrideTemplate(StudentBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudentBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StudentBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.student).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
