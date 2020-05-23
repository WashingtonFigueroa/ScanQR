import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Storage } from '@ionic/storage';
import { Usuario } from '../models/usuario';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
token: string = null;
identity: any = null;
url = environment.servidor;
usuario: Usuario;
usuarior: Usuario;
  constructor( private http: HttpClient,
               private storage: Storage,
               private navCotrl: NavController
                ) {
                  this.usuario = new Usuario(1, 1, '', '', '', '', '', '', '', '', '');
                }

  login(data: any) {
    return new Promise(resolve => {
      this.http.post(`${this.url}login`, data)
      .subscribe(resp => {
        this.guardarToken(resp[ 'token' ], resp[ 'identity' ]);
        console.log('DTMOWED');
        this.navCotrl.navigateRoot('/login');
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

  registro( data) {
      return new Promise(resolve => {
        this.http.post(`${this.url}register`, data)
        .subscribe(resp => {
        this.guardarToken(resp[ 'token' ], resp[ 'identity' ]);
        this.navCotrl.navigateRoot('/login');
        resolve(true);
      }, () => {
        this.token = null;
        this.storage.clear();
        console.log('error');
        resolve(false);
      });
    });
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }

  async validarToken(): Promise<boolean>{
    await this.cargarToken();
    if (!this.token) {
      this.navCotrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    else {
      return Promise.resolve(true);
    }
  }

  logout(){
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navCotrl.navigateRoot('/login', {animated: true});
  }



}

