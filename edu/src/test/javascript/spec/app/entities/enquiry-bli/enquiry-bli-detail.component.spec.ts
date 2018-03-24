/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { EnquiryBliDetailComponent } from '../../../../../../main/webapp/app/entities/enquiry-bli/enquiry-bli-detail.component';
import { EnquiryBliService } from '../../../../../../main/webapp/app/entities/enquiry-bli/enquiry-bli.service';
import { EnquiryBli } from '../../../../../../main/webapp/app/entities/enquiry-bli/enquiry-bli.model';

describe('Component Tests', () => {

    describe('EnquiryBli Management Detail Component', () => {
        let comp: EnquiryBliDetailComponent;
        let fixture: ComponentFixture<EnquiryBliDetailComponent>;
        let service: EnquiryBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [EnquiryBliDetailComponent],
                providers: [
                    EnquiryBliService
                ]
            })
            .overrideTemplate(EnquiryBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnquiryBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnquiryBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EnquiryBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.enquiry).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
