import { BaseEntity } from './../../shared';

export class Bank implements BaseEntity {
    constructor(
        public id?: number,
        public idBank?: number,
        public bankname?: string,
        public address?: BaseEntity,
    ) {
    }
}
