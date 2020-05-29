export class Cupo {
    constructor(
        public id: number,
        // tslint:disable-next-line: variable-name
        public establecimiento_id: number,
        public carga: string,
        public gasto: string,
        public saldo: string,
        // tslint:disable-next-line: variable-name
        public fecha_fin: string,
        public estado: any
    ) {}
}
