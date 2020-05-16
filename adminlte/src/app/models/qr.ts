export class Qr {
    constructor(
        // tslint:disable-next-line: variable-name
        public qr_id: number,
        public codigo: string,
        public nombre: string,
        public fecha: string,
        public horaingreso: string,
        public horasalida: string,
        public tentativa: any
    ) {}
}
