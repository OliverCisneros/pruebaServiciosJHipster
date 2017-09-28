import { BaseEntity } from './../../shared';

export class Address implements BaseEntity {
    constructor(
        public id?: number,
        public idaddress?: number,
        public mainstreet?: string,
        public number?: number,
        public cp?: number,
    ) {
    }
}
