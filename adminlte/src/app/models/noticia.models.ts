export class Noticia {
    constructor(
        public id: number,
        // tslint:disable-next-line: variable-name
        public establecimiento_id: number,
        public titulo: string,
        public detalle: string,
        // tslint:disable-next-line: variable-name
        public fecha_fin: string,
        public image: string,
        public estado: any
    ) {}
}
