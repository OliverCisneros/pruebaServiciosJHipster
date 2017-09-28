import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BlogPersonModule } from './person/person.module';
import { BlogAddressModule } from './address/address.module';
import { BlogHolaModule } from './hola/hola.module';
import { BlogBankModule } from './bank/bank.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BlogPersonModule,
        BlogAddressModule,
        BlogHolaModule,
        BlogBankModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogEntityModule {}
