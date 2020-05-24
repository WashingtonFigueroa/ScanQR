import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public qr;

  constructor(
    private usuarioService: UsuarioService
  ) {
    this.qr = this.usuarioService.getQR();
    console.log(this.qr);
  }

}
