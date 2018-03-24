/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { PaymentBliDetailComponent } from '../../../../../../main/webapp/app/entities/payment-bli/payment-bli-detail.component';
import { PaymentBliService } from '../../../../../../main/webapp/app/entities/payment-bli/payment-bli.service';
import { PaymentBli } from '../../../../../../main/webapp/app/entities/payment-bli/payment-bli.model';

describe('Component Tests', () => {

    describe('PaymentBli Management Detail Component', () => {
        let comp: PaymentBliDetailComponent;
        let fixture: ComponentFixture<PaymentBliDetailComponent>;
        let service: PaymentBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [PaymentBliDetailComponent],
                providers: [
                    PaymentBliService
                ]
            })
            .overrideTemplate(PaymentBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PaymentBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.payment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
