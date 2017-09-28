import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Hola } from './hola.model';
import { HolaService } from './hola.service';

@Component({
    selector: 'jhi-hola-detail',
    templateUrl: './hola-detail.component.html'
})
export class HolaDetailComponent implements OnInit, OnDestroy {

    hola: Hola;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private holaService: HolaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHolas();
    }

    load(id) {
        this.holaService.find(id).subscribe((hola) => {
            this.hola = hola;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHolas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'holaListModification',
            (response) => this.load(this.hola.id)
        );
    }
}
