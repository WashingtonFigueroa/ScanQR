export class Presentacion {
    constructor(
        // tslint:disable-next-line: variable-name
        public presentacion_id: number,
        public abreviatura: string,
        public presentacion: string,
        public cantidad: string,
        public descripcion: string,
        public estado: any
    ) {}
}
