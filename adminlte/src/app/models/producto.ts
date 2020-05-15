export class Producto {
    constructor(
        // tslint:disable-next-line: variable-name
        public producto_id: number,
        // tslint:disable-next-line: variable-name
        public empresa_id: number,
        // tslint:disable-next-line: variable-name
        public presentacion_id: number,
        public nombre: string,
        public descripcion: string,
        public imagen: string,
        public valor: any,
        public stock: number,
        public cantidad: number,
        public inventariable: any,
        public estado: any
    ) {}
}
