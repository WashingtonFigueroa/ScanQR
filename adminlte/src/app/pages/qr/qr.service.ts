import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  public url = environment.servidor;
  public status: string;
  public token;
  public identity;

  constructor( private http: HttpClient ) {
    }

    getQrs(): Observable <any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(this.url + 'qr', {headers: headerss});
    }

    show(id): Observable <any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(this.url + 'qr/' + id, {headers: headerss});
    }

    guardar(token, qr): Observable <any> {
      const json = JSON.stringify(qr);
      const params = 'json=' + json;
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
      return this.http.post(this.url + 'qr', params, {headers: headerss});
    }

    update(token, qr, id): Observable <any> {
      const json = JSON.stringify(qr);
      const params = 'json=' + json;
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
      return this.http.put(this.url + 'qr/' + id, params, {headers: headerss});
    }

    delete(token, id): Observable <any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
      return this.http.delete(this.url + 'qr/' + id, {headers: headerss});
    }
}
