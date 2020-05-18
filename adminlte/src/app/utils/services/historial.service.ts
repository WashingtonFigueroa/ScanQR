import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  servidor = environment.servidor;

  constructor(private http: HttpClient) {
  }

  index() {
    return this.http.get(`${this.servidor}historial`);
  }

  store(data: any) {
    return this.http.post(`${this.servidor}historial`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  }
}
