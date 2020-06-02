import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  public url = environment.servidor;
  public status: string;
  public token;
  public identity;

  constructor(private http: HttpClient) {
  }

  getPlans(token): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'plan', {headers: headerss});
  }

  getListaplans(token): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.get(this.url + 'lista-plans', {headers: headerss});
  }

  show(token, id): Observable<any> {
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this.http.get(this.url + 'plan/' + id, {headers: headerss});
  }

  guardar(token, plan): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.post(this.url + 'plan', plan, {headers: headers});
  }

  update(token, plan, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.put(this.url + 'plan/' + id, plan, {headers: headers});
  }

  delete(token, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);
    return this.http.delete(this.url + 'plan/' + id, {headers: headers});
  }
}