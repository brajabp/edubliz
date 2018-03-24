/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { EmployeeBliDetailComponent } from '../../../../../../main/webapp/app/entities/employee-bli/employee-bli-detail.component';
import { EmployeeBliService } from '../../../../../../main/webapp/app/entities/employee-bli/employee-bli.service';
import { EmployeeBli } from '../../../../../../main/webapp/app/entities/employee-bli/employee-bli.model';

describe('Component Tests', () => {

    describe('EmployeeBli Management Detail Component', () => {
        let comp: EmployeeBliDetailComponent;
        let fixture: ComponentFixture<EmployeeBliDetailComponent>;
        let service: EmployeeBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [EmployeeBliDetailComponent],
                providers: [
                    EmployeeBliService
                ]
            })
            .overrideTemplate(EmployeeBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EmployeeBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.employee).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
