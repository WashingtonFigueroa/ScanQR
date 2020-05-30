import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Noticia } from 'src/app/models/noticia.models';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public noticias: Noticia;
  public base = environment.servidor;
  constructor(
    private usuarioService: UsuarioService,
    private uiservice: UiServiceService) {
  }

  ngOnInit() {
    this.cargarNoticias();
  }

  doRefresh(event) {
    this.cargarNoticias();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  cargarNoticias() {
    this.usuarioService.getNoticias().subscribe(response => {
      this.noticias = response;
      console.log(this.noticias);
    }, error => {
      this.uiservice.alertaInformativa('No se ha encontrado Noticias');
    });
  }
  
  logout(){
    this.usuarioService.logout();
  }
}
