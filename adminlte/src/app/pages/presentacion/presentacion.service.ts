import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {
  public url = environment.servidor;
  public status: string;
  public token;
  public identity;

  constructor( private http: HttpClient ) {
    }

    index(): Observable <any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(this.url + 'presentacion', {headers: headerss});
    }

    show(id): Observable <any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(this.url + 'presentacion/' + id, {headers: headerss});
    }

    create(token, presentacion): Observable <any> {
      const json = JSON.stringify(presentacion);
      const params = 'json=' + json;
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
      return this.http.post(this.url + 'presentacion', params, {headers: headerss});
    }

    update(token, presentacion, id): Observable <any> {
      const json = JSON.stringify(presentacion);
      const params = 'json=' + json;
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
      return this.http.put(this.url + 'presentacion/' + id, params, {headers: headerss});
    }

    delete(token, id): Observable <any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
      return this.http.delete(this.url + 'presentacion/' + id, {headers: headerss});
    }

}
