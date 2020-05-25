export class Empresa {
    constructor(
        public id: number,
        public documento: string,
        public nombre: string,
        public actividad: string,
        public direccion: string,
        public email: string,
        public telefono: string,
        public logo: string,
        public estado: any
    ) {}
}
