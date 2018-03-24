/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { FollowUpBliComponent } from '../../../../../../main/webapp/app/entities/follow-up-bli/follow-up-bli.component';
import { FollowUpBliService } from '../../../../../../main/webapp/app/entities/follow-up-bli/follow-up-bli.service';
import { FollowUpBli } from '../../../../../../main/webapp/app/entities/follow-up-bli/follow-up-bli.model';

describe('Component Tests', () => {

    describe('FollowUpBli Management Component', () => {
        let comp: FollowUpBliComponent;
        let fixture: ComponentFixture<FollowUpBliComponent>;
        let service: FollowUpBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [FollowUpBliComponent],
                providers: [
                    FollowUpBliService
                ]
            })
            .overrideTemplate(FollowUpBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FollowUpBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FollowUpBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FollowUpBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.followUps[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
