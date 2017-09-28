import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from '../../shared';
import {
    HolaService,
    HolaPopupService,
    HolaComponent,
    HolaDetailComponent,
    HolaDialogComponent,
    HolaPopupComponent,
    HolaDeletePopupComponent,
    HolaDeleteDialogComponent,
    holaRoute,
    holaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...holaRoute,
    ...holaPopupRoute,
];

@NgModule({
    imports: [
        BlogSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        HolaComponent,
        HolaDetailComponent,
        HolaDialogComponent,
        HolaDeleteDialogComponent,
        HolaPopupComponent,
        HolaDeletePopupComponent,
    ],
    entryComponents: [
        HolaComponent,
        HolaDialogComponent,
        HolaPopupComponent,
        HolaDeleteDialogComponent,
        HolaDeletePopupComponent,
    ],
    providers: [
        HolaService,
        HolaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogHolaModule {}
