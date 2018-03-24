/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { SubjectBliDetailComponent } from '../../../../../../main/webapp/app/entities/subject-bli/subject-bli-detail.component';
import { SubjectBliService } from '../../../../../../main/webapp/app/entities/subject-bli/subject-bli.service';
import { SubjectBli } from '../../../../../../main/webapp/app/entities/subject-bli/subject-bli.model';

describe('Component Tests', () => {

    describe('SubjectBli Management Detail Component', () => {
        let comp: SubjectBliDetailComponent;
        let fixture: ComponentFixture<SubjectBliDetailComponent>;
        let service: SubjectBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [SubjectBliDetailComponent],
                providers: [
                    SubjectBliService
                ]
            })
            .overrideTemplate(SubjectBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubjectBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SubjectBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.subject).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
