/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { EnrollBliComponent } from '../../../../../../main/webapp/app/entities/enroll-bli/enroll-bli.component';
import { EnrollBliService } from '../../../../../../main/webapp/app/entities/enroll-bli/enroll-bli.service';
import { EnrollBli } from '../../../../../../main/webapp/app/entities/enroll-bli/enroll-bli.model';

describe('Component Tests', () => {

    describe('EnrollBli Management Component', () => {
        let comp: EnrollBliComponent;
        let fixture: ComponentFixture<EnrollBliComponent>;
        let service: EnrollBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [EnrollBliComponent],
                providers: [
                    EnrollBliService
                ]
            })
            .overrideTemplate(EnrollBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnrollBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnrollBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EnrollBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.enrolls[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
