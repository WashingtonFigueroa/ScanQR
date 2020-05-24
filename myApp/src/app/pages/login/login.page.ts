import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 @ViewChild('slidePrincipal') slides: IonSlides;
  public avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

public usuario: Usuario;
public registr: Usuario;

  constructor( private usuarioService: UsuarioService,
               private navCtrl: NavController,
               private uiservice: UiServiceService) {
    this.usuario = new Usuario(1, 1, 1, '', '', '', '', '', '', '', '', '');
    this.registr = new Usuario(1, 3, 1, '', '', '', '', '', '', '', '', '');
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  ngOnInit() {
  }

  mostrarRegistro() {
    this.slides.lockSwipes( false );
    this.slides.slideTo(0);
    this.slides.lockSwipes( true );
  }
  mostrarlogin(){
    this.slides.lockSwipes( false );
    this.slides.slideTo(1);
    this.slides.lockSwipes( true );
  }
// 15 %
// 10 %
  async login(fLogin: NgForm) {
    if (fLogin.invalid) { return; }
    const valido = await this.usuarioService.login(this.usuario);
    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true});
    } else {
      this.uiservice.alertaInformativa('Usuario y Contraseña no son correctos');
    }
  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) { return; }
    const valido = await this.usuarioService.registro(this.registr);
    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true});
    } else {
      this.uiservice.alertaInformativa('El correo electronico ya existe');
    }
  }

}
