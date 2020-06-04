import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url = environment.servidor;
  public status: string;
  public cedula: string;
  public token;
  public identity;

  constructor(private http: HttpClient) {
  }

  getUsuarios(token): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'usuarios', {headers: headerss});
  }

  getClientes(token): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'cliente', {headers: headerss});
  }

  getListaUsuarios(token): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'lista-usuarios', {headers: headerss});
  }

  show(token, id): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'usuarios/' + id, {headers: headerss});
  }

  guardar(token, usuario): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.post(this.url + 'usuarios', usuario, {headers: headerss});
  }

  update(token, usuario, id): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.put(this.url + 'usuarios/' + id, usuario, {headers: headers});
  }

  delete(token, id): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.delete(this.url + 'usuarios/' + id, {headers: headerss});
  }

  validaCedula(dato) {
    this.cedula = dato;
    console.log(this.cedula);
    if (this.cedula.length === 10) {
      const digitoRegion = this.cedula.substring(0, 2);
      if (digitoRegion >= String(1) && digitoRegion <= String(24)) {
        const ultimoDigito = Number(this.cedula.substring(9, 10));
        const pares = Number(this.cedula.substring(1, 2)) + Number(this.cedula.substring(3, 4)) +
          Number(this.cedula.substring(5, 6)) + Number(this.cedula.substring(7, 8));
        let numeroUno: any = this.cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }

        let numeroTres: any = this.cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }

        let numeroCinco: any = this.cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }

        let numeroSiete: any = this.cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }

        let numeroNueve: any = this.cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }

        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;
        const sumaTotal = (pares + impares);
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);
        const decena = (Number(primerDigitoSuma) + 1) * 10;
        let digitoValidador = decena - sumaTotal;
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }
        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
