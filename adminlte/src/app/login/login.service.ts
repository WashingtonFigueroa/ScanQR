import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url = environment.servidor;
  public status: string;
  public token;
  public identity;

  constructor(private http: HttpClient) {
  }

  register(user): Observable<any> {
    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + 'register', params, {headers: headerss});
  }

  login(data: any) {
    return this.http.post(`${this.url}login`, data);
  }

  signup(user, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user.gettoken = 'true';
    }
    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + 'login', params, {headers: headerss});
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity && identity !== 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  update(token, user): Observable<any> {
    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headerss = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.put(this.url + 'user/update', params, {headers: headerss});
  }
}
