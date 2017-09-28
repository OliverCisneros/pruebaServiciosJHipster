import { BaseEntity } from './../../shared';

export class Person implements BaseEntity {
    constructor(
        public id?: number,
        public idperson?: number,
        public fname?: string,
        public lname?: string,
        public addressPerson?: BaseEntity,
        public bank?: BaseEntity,
    ) {
    }
}
