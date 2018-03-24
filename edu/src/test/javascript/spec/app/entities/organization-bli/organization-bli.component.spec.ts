/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EduTestModule } from '../../../test.module';
import { OrganizationBliComponent } from '../../../../../../main/webapp/app/entities/organization-bli/organization-bli.component';
import { OrganizationBliService } from '../../../../../../main/webapp/app/entities/organization-bli/organization-bli.service';
import { OrganizationBli } from '../../../../../../main/webapp/app/entities/organization-bli/organization-bli.model';

describe('Component Tests', () => {

    describe('OrganizationBli Management Component', () => {
        let comp: OrganizationBliComponent;
        let fixture: ComponentFixture<OrganizationBliComponent>;
        let service: OrganizationBliService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EduTestModule],
                declarations: [OrganizationBliComponent],
                providers: [
                    OrganizationBliService
                ]
            })
            .overrideTemplate(OrganizationBliComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganizationBliComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganizationBliService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrganizationBli(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.organizations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
