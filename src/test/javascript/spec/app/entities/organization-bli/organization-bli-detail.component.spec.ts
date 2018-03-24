/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EduTestModule } from '../../../test.module';
import { OrganizationBliDetailComponent } from '../../../../../../main/webapp/app/entities/organization-bli/organization-bli-detail.component';
import { OrganizationBliService } from '../../../../../../main/webapp/app/entities/organization-bli/organization-bli.service';
import { OrganizationBli } from '../../../../../../main/webapp/app/entities/organization-bli/organization-bli.model';

describe('Component Tests', () => {

    describe('OrganizationBli Management Detail Component', () => {
        let comp: OrganizationBliDetailComponent;
        let fixture: ComponentFixture<OrganizationBliDetailComponent>;
        let service: OrganizationBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [OrganizationBliDetailComponent],
                providers: [
                    OrganizationBliService
                ]
            })
            .overrideTemplate(OrganizationBliDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganizationBliDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganizationBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrganizationBli(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.organization).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
