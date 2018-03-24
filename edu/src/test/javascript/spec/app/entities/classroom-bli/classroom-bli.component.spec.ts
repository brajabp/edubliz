/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { ClassroomBliComponent } from '../../../../../../main/webapp/app/entities/classroom-bli/classroom-bli.component';
import { ClassroomBliService } from '../../../../../../main/webapp/app/entities/classroom-bli/classroom-bli.service';
import { ClassroomBli } from '../../../../../../main/webapp/app/entities/classroom-bli/classroom-bli.model';

describe('Component Tests', () => {

    describe('ClassroomBli Management Component', () => {
        let comp: ClassroomBliComponent;
        let fixture: ComponentFixture<ClassroomBliComponent>;
        let service: ClassroomBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [ClassroomBliComponent],
                providers: [
                    ClassroomBliService
                ]
            })
            .overrideTemplate(ClassroomBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassroomBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassroomBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ClassroomBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.classrooms[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
