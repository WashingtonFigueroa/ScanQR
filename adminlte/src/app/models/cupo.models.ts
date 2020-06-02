export class Cupo {
  constructor(
    public id: number,
    // tslint:disable-next-line: variable-name
    public establecimiento_id: number,
    // tslint:disable-next-line: variable-name
    public paquete_id: number,
    public carga: number,
    public gasto: number,
    public saldo: number,
    // tslint:disable-next-line: variable-name
    public fecha_fin: string,
    public estado: any,
    public establecimiento?: string
  ) {
  }
}
