export class Usuario {
    constructor(
      public id: number,
      // tslint:disable-next-line: variable-name
      public cargo_id: number,
      // tslint:disable-next-line: variable-name
      public establecimiento_id: number,
      public cuenta: string,
      public nombre: string,
      public password: string,
      public password2: string,
      public cedula: string,
      public direccion: string,
      public telefono: string,
      // tslint:disable-next-line: variable-name
      public fecha_nacimiento: any,
      public image: string,
      public email?: string,
      public aceptacion?: boolean
    ) {
    }
  }
  