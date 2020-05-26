export class Qr {
    constructor(
        public id: number,
        // tslint:disable-next-line: variable-name
        public user_id: number,
        public codqr: string,
        public nombre: string,
        public tiempo: number,
        public estado: string
    ) {}
}
