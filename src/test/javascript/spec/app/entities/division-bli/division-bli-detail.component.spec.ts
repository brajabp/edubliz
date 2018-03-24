/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { DivisionBliDetailComponent } from '../../../../../../main/webapp/app/entities/division-bli/division-bli-detail.component';
import { DivisionBliService } from '../../../../../../main/webapp/app/entities/division-bli/division-bli.service';
import { DivisionBli } from '../../../../../../main/webapp/app/entities/division-bli/division-bli.model';

describe('Component Tests', () => {

    describe('DivisionBli Management Detail Component', () => {
        let comp: DivisionBliDetailComponent;
        let fixture: ComponentFixture<DivisionBliDetailComponent>;
        let service: DivisionBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [DivisionBliDetailComponent],
                providers: [
                    DivisionBliService
                ]
            })
            .overrideTemplate(DivisionBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DivisionBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DivisionBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DivisionBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.division).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
