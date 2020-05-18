export class User {
    constructor(
        public id: number,
        // tslint:disable-next-line: variable-name
        public cargo_id: number,
        public nombre: string,
        public password: string,
        public password2: string,
        public email: string,
        public cedula: string,
        public direccion: string,
        public telefono: string,
        // tslint:disable-next-line: variable-name
        public fecha_nacimiento: any,
        public image: string
    ) {}
}
