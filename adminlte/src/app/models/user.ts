export class User {
    constructor(
        // tslint:disable-next-line: variable-name
        public user_id: number,
        public role: string,
        public cedula: string,
        public name: string,
        public email: string,
        public password: string,
        public password2: string,
        public direccion: string,
        public telefono: string,
        // tslint:disable-next-line: variable-name
        public fecha_nacimiento: any,
        public image: string
    ) {}
}
