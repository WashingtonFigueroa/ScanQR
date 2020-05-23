import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
token: string = null;
identity: any = null;
url = environment.servidor;
  constructor( private http: HttpClient,
               private storage: Storage
                ) { }

  login(data: any) {
    return new Promise(resolve => {
      this.http.post(`${this.url}login`, data)
      .subscribe(resp => {
        this.guardarToken(resp[ 'token' ], resp[ 'identity' ]);
        console.log('DTMOWED');
        resolve(true);
      }, () => {
        this.token = null;
        this.storage.clear();
        console.log('error');
        resolve(false);
      });
    });
  }

  async guardarToken(token: string, identity: any){
    this.token = token;
    this.identity = identity;
    await this.storage.set('token', token);
    await this.storage.set('identity', identity);
  }

  registro( usuario: any) {
      return new Promise(resolve => {
        this.http.post(`${this.url}register`, usuario)
        .subscribe(resp => {
        this.guardarToken(resp[ 'token' ], resp[ 'identity' ]);
        console.log('DTMOWED');
        resolve(true);
      }, () => {
        this.token = null;
        this.storage.clear();
        console.log('error');
        resolve(false);
      });
    });
  }


}

