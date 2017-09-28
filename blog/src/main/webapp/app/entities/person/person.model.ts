import { BaseEntity } from './../../shared';

export class Person implements BaseEntity {
    constructor(
        public id?: number,
        public idperson?: number,
        public name?: string,
        public surname?: string,
        public imageContentType?: string,
        public image?: any,
        public address?: BaseEntity,
    ) {
    }
}
