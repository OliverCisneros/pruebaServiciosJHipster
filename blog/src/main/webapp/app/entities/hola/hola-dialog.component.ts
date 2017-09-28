import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Hola } from './hola.model';
import { HolaPopupService } from './hola-popup.service';
import { HolaService } from './hola.service';

@Component({
    selector: 'jhi-hola-dialog',
    templateUrl: './hola-dialog.component.html'
})
export class HolaDialogComponent implements OnInit {

    hola: Hola;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private holaService: HolaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.hola.id !== undefined) {
            this.subscribeToSaveResponse(
                this.holaService.update(this.hola));
        } else {
            this.subscribeToSaveResponse(
                this.holaService.create(this.hola));
        }
    }

    private subscribeToSaveResponse(result: Observable<Hola>) {
        result.subscribe((res: Hola) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Hola) {
        this.eventManager.broadcast({ name: 'holaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-hola-popup',
    template: ''
})
export class HolaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private holaPopupService: HolaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.holaPopupService
                    .open(HolaDialogComponent as Component, params['id']);
            } else {
                this.holaPopupService
                    .open(HolaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
