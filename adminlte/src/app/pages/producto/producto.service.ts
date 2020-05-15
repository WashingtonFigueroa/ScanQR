import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public url = environment.servidor;
  public status: string;
  public token;
  public identity;

  constructor( private http: HttpClient ) {
    }

    index(): Observable <any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(this.url + 'productos', {headers: headerss});
    }

    show(id): Observable <any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(this.url + 'productos/' + id, {headers: headerss});
    }

    create(token, producto): Observable <any> {
      const json = JSON.stringify(producto);
      const params = 'json=' + json;
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
      return this.http.post(this.url + 'productos', params, {headers: headerss});
    }

    update(token, productos, id): Observable <any> {
      const json = JSON.stringify(productos);
      const params = 'json=' + json;
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
      return this.http.put(this.url + 'productos/' + id, params, {headers: headerss});
    }

    delete(token, id): Observable <any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
      return this.http.delete(this.url + 'productos/' + id, {headers: headerss});
    }

}
