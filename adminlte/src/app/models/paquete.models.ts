export class Paquete {
    constructor(
        public id: number,
        // tslint:disable-next-line: variable-name
        public plan_id: number,
        public cupo: number,
        public valor: number,
        public estado: any
    ) {}
}
