/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { ClassroomBliDetailComponent } from '../../../../../../main/webapp/app/entities/classroom-bli/classroom-bli-detail.component';
import { ClassroomBliService } from '../../../../../../main/webapp/app/entities/classroom-bli/classroom-bli.service';
import { ClassroomBli } from '../../../../../../main/webapp/app/entities/classroom-bli/classroom-bli.model';

describe('Component Tests', () => {

    describe('ClassroomBli Management Detail Component', () => {
        let comp: ClassroomBliDetailComponent;
        let fixture: ComponentFixture<ClassroomBliDetailComponent>;
        let service: ClassroomBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [ClassroomBliDetailComponent],
                providers: [
                    ClassroomBliService
                ]
            })
            .overrideTemplate(ClassroomBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassroomBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassroomBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ClassroomBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.classroom).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
