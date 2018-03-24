/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { EnrollBliDetailComponent } from '../../../../../../main/webapp/app/entities/enroll-bli/enroll-bli-detail.component';
import { EnrollBliService } from '../../../../../../main/webapp/app/entities/enroll-bli/enroll-bli.service';
import { EnrollBli } from '../../../../../../main/webapp/app/entities/enroll-bli/enroll-bli.model';

describe('Component Tests', () => {

    describe('EnrollBli Management Detail Component', () => {
        let comp: EnrollBliDetailComponent;
        let fixture: ComponentFixture<EnrollBliDetailComponent>;
        let service: EnrollBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [EnrollBliDetailComponent],
                providers: [
                    EnrollBliService
                ]
            })
            .overrideTemplate(EnrollBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnrollBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnrollBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EnrollBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.enroll).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
