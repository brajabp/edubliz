/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { ClassLogBliDetailComponent } from '../../../../../../main/webapp/app/entities/class-log-bli/class-log-bli-detail.component';
import { ClassLogBliService } from '../../../../../../main/webapp/app/entities/class-log-bli/class-log-bli.service';
import { ClassLogBli } from '../../../../../../main/webapp/app/entities/class-log-bli/class-log-bli.model';

describe('Component Tests', () => {

    describe('ClassLogBli Management Detail Component', () => {
        let comp: ClassLogBliDetailComponent;
        let fixture: ComponentFixture<ClassLogBliDetailComponent>;
        let service: ClassLogBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [ClassLogBliDetailComponent],
                providers: [
                    ClassLogBliService
                ]
            })
            .overrideTemplate(ClassLogBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassLogBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassLogBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ClassLogBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.classLog).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
