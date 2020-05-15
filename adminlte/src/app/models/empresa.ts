export class Empresa {
    constructor(
        // tslint:disable-next-line: variable-name
        public empresa_id: number,
        public nombre: string,
        public eslogan: string,
        public actividad: string,
        public direccion: string,
        public telefono: string,
        public email: string,
        public web: string,
        public detalle: string,
        public coordenadas: string,
        public logo: string,
        public estado: any
    ) {}
}
