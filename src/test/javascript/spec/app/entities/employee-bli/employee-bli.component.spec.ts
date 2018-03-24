/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { EmployeeBliComponent } from '../../../../../../main/webapp/app/entities/employee-bli/employee-bli.component';
import { EmployeeBliService } from '../../../../../../main/webapp/app/entities/employee-bli/employee-bli.service';
import { EmployeeBli } from '../../../../../../main/webapp/app/entities/employee-bli/employee-bli.model';

describe('Component Tests', () => {

    describe('EmployeeBli Management Component', () => {
        let comp: EmployeeBliComponent;
        let fixture: ComponentFixture<EmployeeBliComponent>;
        let service: EmployeeBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [EmployeeBliComponent],
                providers: [
                    EmployeeBliService
                ]
            })
            .overrideTemplate(EmployeeBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EmployeeBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.employees[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
