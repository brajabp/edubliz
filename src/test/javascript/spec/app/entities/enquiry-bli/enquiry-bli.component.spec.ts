/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { EnquiryBliComponent } from '../../../../../../main/webapp/app/entities/enquiry-bli/enquiry-bli.component';
import { EnquiryBliService } from '../../../../../../main/webapp/app/entities/enquiry-bli/enquiry-bli.service';
import { EnquiryBli } from '../../../../../../main/webapp/app/entities/enquiry-bli/enquiry-bli.model';

describe('Component Tests', () => {

    describe('EnquiryBli Management Component', () => {
        let comp: EnquiryBliComponent;
        let fixture: ComponentFixture<EnquiryBliComponent>;
        let service: EnquiryBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [EnquiryBliComponent],
                providers: [
                    EnquiryBliService
                ]
            })
            .overrideTemplate(EnquiryBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnquiryBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnquiryBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EnquiryBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.enquiries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
