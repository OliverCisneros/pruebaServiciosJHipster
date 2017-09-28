/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BlogTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { HolaDetailComponent } from '../../../../../../main/webapp/app/entities/hola/hola-detail.component';
import { HolaService } from '../../../../../../main/webapp/app/entities/hola/hola.service';
import { Hola } from '../../../../../../main/webapp/app/entities/hola/hola.model';

describe('Component Tests', () => {

    describe('Hola Management Detail Component', () => {
        let comp: HolaDetailComponent;
        let fixture: ComponentFixture<HolaDetailComponent>;
        let service: HolaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [HolaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    HolaService,
                    JhiEventManager
                ]
            }).overrideTemplate(HolaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HolaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HolaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Hola(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.hola).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
