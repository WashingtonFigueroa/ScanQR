export class Historial {
  constructor(
    public nombre: string,
    public ingreso: string,
    public salida: string,
    public salida_tentativa: string,
    public tiempo: number,
    public estado: string,
    public id: number
  ) {
  }
}
