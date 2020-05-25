import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  public url = environment.servidor;
  public status: string;
  public token;
  public identity;

  constructor( private http: HttpClient ) {
    }
    getEstablecimientos(token): Observable<any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);
      return this.http.get(this.url + 'establecimiento', {headers: headerss});
    }

    getListaEstablecimientos(token): Observable<any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);
      return this.http.get(this.url + 'lista-establecimientos', {headers: headerss});
    }

    show(token, id): Observable<any> {
      const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
      return this.http.get(this.url + 'establecimiento/' + id, {headers: headerss});
    }

    guardar(token, establecimiento): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
      return this.http.post(this.url + 'establecimiento', establecimiento, {headers: headers});
    }

    update(token, establecimiento, id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
      return this.http.put(this.url + 'establecimiento/' + id, establecimiento, {headers: headers});
    }

    delete(token, id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
      return this.http.delete(this.url + 'establecimiento/' + id, {headers: headers});
    }
    // getEmpresas(): Observable <any> {
    //   const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //   return this.http.get(this.url + 'empresa', {headers: headerss});
    // }

    // show(id): Observable <any> {
    //   const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //   return this.http.get(this.url + 'empresa/' + id, {headers: headerss});
    // }

    // guardar(token, empresa): Observable <any> {
    //   const json = JSON.stringify(empresa);
    //   const params = 'json=' + json;
    //   const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    //                                     .set('Authorization', token);
    //   return this.http.post(this.url + 'empresa', params, {headers: headerss});
    // }

    // update(token, empresa, id): Observable <any> {
    //   const json = JSON.stringify(empresa);
    //   const params = 'json=' + json;
    //   const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    //                                     .set('Authorization', token);
    //   return this.http.put(this.url + 'empresa/' + id, params, {headers: headerss});
    // }

    // delete(token, id): Observable <any> {
    //   const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    //                                     .set('Authorization', token);
    //   return this.http.delete(this.url + 'empresa/' + id, {headers: headerss});
    // }

}
