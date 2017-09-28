import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Hola } from './hola.model';
import { HolaPopupService } from './hola-popup.service';
import { HolaService } from './hola.service';

@Component({
    selector: 'jhi-hola-delete-dialog',
    templateUrl: './hola-delete-dialog.component.html'
})
export class HolaDeleteDialogComponent {

    hola: Hola;

    constructor(
        private holaService: HolaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.holaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'holaListModification',
                content: 'Deleted an hola'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hola-delete-popup',
    template: ''
})
export class HolaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private holaPopupService: HolaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.holaPopupService
                .open(HolaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
