import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, IonInfiniteScroll  } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Empresa } from 'src/app/models/empresa.models';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public base = environment.servidor;
  public usuario: Usuario;
  public establecimientos: Empresa;
  public registr: Usuario;
  public passwordType = 'password';

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiservice: UiServiceService) {
    this.usuario = new Usuario(1, 1, 1, '', '', '', '', '', '', '', '', '');
    this.registr = new Usuario(1, 4, 1, '', '', '', '', '', '', '', '', '');
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  ngOnInit() {
    this.usuarioService.getEstablecimientos().subscribe(response => {
      this.establecimientos = response;
      console.log(this.establecimientos);
    }, error => {
      console.log(error);
    });
  }

  togglePasswordMode() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
  mostrarlogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(2);
    this.slides.lockSwipes(true);
  }

  nosotros(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) { return; }
    const valido = await this.usuarioService.login(this.usuario);
    if (!valido) {
      // this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
   // } else {
      this.uiservice.alertaInformativa('Usuario y Contraseña no son correctos');
    }
  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) { return; }
    const valido = await this.usuarioService.registro(this.registr);
    if (valido) {
    //   this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    this.uiservice.alertaInformativa('Usuario Registrado');
    this.mostrarRegistro();
  } else {
      this.uiservice.alertaInformativa('El correo electronico ya existe');
    }
  }

}
