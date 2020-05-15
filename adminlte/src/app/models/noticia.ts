export class Noticia {
    constructor(
        public noticia_id: number,
        public empresa_id: number,
        public userid: number,
        public nombre: string,
        public detalle: string,
        public imagen: string,
        public fecha_ini: string,
        public fecha_fin: string,
        public estado: any
    ) {}
}
