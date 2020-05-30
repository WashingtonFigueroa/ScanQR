import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public qr;
  constructor(
    private usuarioService: UsuarioService,
    private storage: Storage ) {
      this.cargarData();
  }

  ngOnInit() {
  }

  cargarData(){
    this.storage.get('qr').then(qrcodigo => this.qr = qrcodigo);
  }

  logout(){
    this.usuarioService.logout();
  }

}
