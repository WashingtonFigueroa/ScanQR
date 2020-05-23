import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private usuarioService: UsuarioService,
              private navCrtl: NavController) {}

  logout(){
    this.usuarioService.logout();
  }
}
