import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CupoService {
  public url = environment.servidor;
  public status: string;
  public token;
  public identity;

  constructor(private http: HttpClient) {
  }

  getCupos(token): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'cupo', {headers: headerss});
  }

  getListaCupos(token): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'lista-cupos', {headers: headerss});
  }

  show(token, id): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'cupo/' + id, {headers: headerss});
  }

  guardar(token, cupo): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.post(this.url + 'cupo', cupo, {headers: headers});
  }

  update(token, cupo, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.put(this.url + 'cupo/' + id, cupo, {headers: headers});
  }

  delete(token, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.delete(this.url + 'cupo/' + id, {headers: headers});
  }

  activarCupo(token, id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.put(`${this.url}activar-cupo/${id}`, null, {headers: headers});
  }

  inactivarCupo(token, id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.put(`${this.url}inactivar-cupo/${id}`, null, {headers: headers});
  }
}
