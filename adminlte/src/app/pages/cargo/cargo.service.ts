import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  public url = environment.servidor;
  public status: string;
  public token;
  public identity;

  constructor(private http: HttpClient) {
  }

  getCargos(token): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'cargo', {headers: headerss});
  }

  show(token, id): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this.http.get(this.url + 'cargo/' + id, {headers: headerss});
  }

  guardar(token, cargo): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.post(this.url + 'cargo', cargo, {headers: headers});
  }

  update(token, cargo, id): Observable<any> {
    const json = JSON.stringify(cargo);
    const params = 'json=' + json;
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.put(this.url + 'cargo/' + id, params, {headers: headerss});
  }

  delete(token, id): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.delete(this.url + 'cargo/' + id, {headers: headerss});
  }
}
