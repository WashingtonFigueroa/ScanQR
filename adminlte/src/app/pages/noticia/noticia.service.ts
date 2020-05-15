import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  public url = environment.servidor;
  public status: string;
  public token;
  public identity;

  constructor( private http: HttpClient ) {
    }

    index(): Observable <any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(this.url + 'noticia', {headers: headerss});
    }

    show(id): Observable <any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(this.url + 'noticia/' + id, {headers: headerss});
    }

    create(token, noticia): Observable <any> {
      const json = JSON.stringify(noticia);
      const params = 'json=' + json;
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
      return this.http.post(this.url + 'noticia', params, {headers: headerss});
    }

    update(token, noticia, id): Observable <any> {
      const json = JSON.stringify(noticia);
      const params = 'json=' + json;
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
      return this.http.put(this.url + 'noticia/' + id, params, {headers: headerss});
    }

    delete(token, id): Observable <any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
      return this.http.delete(this.url + 'noticia/' + id, {headers: headerss});
    }
}
