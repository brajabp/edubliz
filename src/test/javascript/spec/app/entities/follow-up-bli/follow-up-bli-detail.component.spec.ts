/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { FollowUpBliDetailComponent } from '../../../../../../main/webapp/app/entities/follow-up-bli/follow-up-bli-detail.component';
import { FollowUpBliService } from '../../../../../../main/webapp/app/entities/follow-up-bli/follow-up-bli.service';
import { FollowUpBli } from '../../../../../../main/webapp/app/entities/follow-up-bli/follow-up-bli.model';

describe('Component Tests', () => {

    describe('FollowUpBli Management Detail Component', () => {
        let comp: FollowUpBliDetailComponent;
        let fixture: ComponentFixture<FollowUpBliDetailComponent>;
        let service: FollowUpBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [FollowUpBliDetailComponent],
                providers: [
                    FollowUpBliService
                ]
            })
            .overrideTemplate(FollowUpBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FollowUpBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FollowUpBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FollowUpBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.followUp).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
