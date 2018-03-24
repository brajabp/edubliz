/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { DivisionBliComponent } from '../../../../../../main/webapp/app/entities/division-bli/division-bli.component';
import { DivisionBliService } from '../../../../../../main/webapp/app/entities/division-bli/division-bli.service';
import { DivisionBli } from '../../../../../../main/webapp/app/entities/division-bli/division-bli.model';

describe('Component Tests', () => {

    describe('DivisionBli Management Component', () => {
        let comp: DivisionBliComponent;
        let fixture: ComponentFixture<DivisionBliComponent>;
        let service: DivisionBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [DivisionBliComponent],
                providers: [
                    DivisionBliService
                ]
            })
            .overrideTemplate(DivisionBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DivisionBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DivisionBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DivisionBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.divisions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
