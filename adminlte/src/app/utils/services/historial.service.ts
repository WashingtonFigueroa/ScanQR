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
    return this.http.get(`${this.servidor}historial`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  }

  stats() {
    return this.http.get(`${this.servidor}stats`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  }

  ingresosHoy() {
    return this.http.get(`${this.servidor}ingresos-hoy`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  }

  buscarHistorial(data: any) {
    return this.http.post(`${this.servidor}buscar-historial`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  }

  store(data: any) {
    return this.http.post(`${this.servidor}historial`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  }
}
