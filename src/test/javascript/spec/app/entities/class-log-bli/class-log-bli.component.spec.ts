/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { ClassLogBliComponent } from '../../../../../../main/webapp/app/entities/class-log-bli/class-log-bli.component';
import { ClassLogBliService } from '../../../../../../main/webapp/app/entities/class-log-bli/class-log-bli.service';
import { ClassLogBli } from '../../../../../../main/webapp/app/entities/class-log-bli/class-log-bli.model';

describe('Component Tests', () => {

    describe('ClassLogBli Management Component', () => {
        let comp: ClassLogBliComponent;
        let fixture: ComponentFixture<ClassLogBliComponent>;
        let service: ClassLogBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [ClassLogBliComponent],
                providers: [
                    ClassLogBliService
                ]
            })
            .overrideTemplate(ClassLogBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassLogBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassLogBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ClassLogBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.classLogs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
