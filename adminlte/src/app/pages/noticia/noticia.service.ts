import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  public url = environment.servidor;
  public status: string; 
  public token;
  public identity;

  constructor(private http: HttpClient) {
  }

  getNoticias(token): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'noticia', {headers: headerss});
  }

  getListaNoticias(token): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'lista-noticias', {headers: headerss});
  }

  show(token, id): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this.http.get(this.url + 'noticia/' + id, {headers: headerss});
  }

  guardar(token, noticia): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.post(this.url + 'noticia', noticia, {headers: headers});
  }

  update(token, noticia, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.put(this.url + 'noticia/' + id, noticia, {headers: headers});
  }

  delete(token, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);
    return this.http.delete(this.url + 'noticia/' + id, {headers: headers});
  }
}
