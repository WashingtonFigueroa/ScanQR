export class Historial {
    constructor(
        // tslint:disable-next-line: variable-name
        public qr_id: number,
        public nombre: number,
        public ingreso: Date,
        public salida: Date,
        // tslint:disable-next-line: variable-name
        public salida_tentativa: Date,
        public tiempo: number,
        public estado: string
    ) {}
}
