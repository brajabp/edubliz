/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { SubjectBliComponent } from '../../../../../../main/webapp/app/entities/subject-bli/subject-bli.component';
import { SubjectBliService } from '../../../../../../main/webapp/app/entities/subject-bli/subject-bli.service';
import { SubjectBli } from '../../../../../../main/webapp/app/entities/subject-bli/subject-bli.model';

describe('Component Tests', () => {

    describe('SubjectBli Management Component', () => {
        let comp: SubjectBliComponent;
        let fixture: ComponentFixture<SubjectBliComponent>;
        let service: SubjectBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [SubjectBliComponent],
                providers: [
                    SubjectBliService
                ]
            })
            .overrideTemplate(SubjectBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubjectBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SubjectBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.subjects[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
