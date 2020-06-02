import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {
  public url = environment.servidor;
  public status: string; 
  public token;
  public identity;

  constructor(private http: HttpClient) {
  }

  getPaquetes(token): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'paquete', {headers: headerss});
  }

  getListaPaquetes(token): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'lista-paquetes', {headers: headerss});
  }

  show(token, id): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this.http.get(this.url + 'paquete/' + id, {headers: headerss});
  }

  guardar(token, paquete): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.post(this.url + 'paquete', paquete, {headers: headers});
  }

  update(token, paquete, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.put(this.url + 'paquete/' + id, paquete, {headers: headers});
  }

  delete(token, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);
    return this.http.delete(this.url + 'paquete/' + id, {headers: headers});
  }
}
