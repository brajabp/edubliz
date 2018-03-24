/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { PaymentBliComponent } from '../../../../../../main/webapp/app/entities/payment-bli/payment-bli.component';
import { PaymentBliService } from '../../../../../../main/webapp/app/entities/payment-bli/payment-bli.service';
import { PaymentBli } from '../../../../../../main/webapp/app/entities/payment-bli/payment-bli.model';

describe('Component Tests', () => {

    describe('PaymentBli Management Component', () => {
        let comp: PaymentBliComponent;
        let fixture: ComponentFixture<PaymentBliComponent>;
        let service: PaymentBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [PaymentBliComponent],
                providers: [
                    PaymentBliService
                ]
            })
            .overrideTemplate(PaymentBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PaymentBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.payments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
