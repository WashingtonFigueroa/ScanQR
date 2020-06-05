import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, IonInfiniteScroll  } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Empresa } from 'src/app/models/empresa.models';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from 'src/app/models/usuario';
import { Router} from '@angular/router';

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
    private router: Router,
    private uiservice: UiServiceService) {
    this.usuario = new Usuario(1, 1, 1, '', '', '', '', '', '', '', null, '', null);
    this.registr = new Usuario(1, 4, 1, '', '', '', '', '', '', '', null, '', null );
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

   login(fLogin: NgForm) {
    if (fLogin.invalid) { return; }
    const valido =  this.usuarioService.login(this.usuario);
    this.router.navigate(['/main/tabs/tab1']);
  
    if (!valido) {
      // this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
   // } else {
      this.uiservice.alertaInformativa('Usuario o contraseña no son correctos');
    }
  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) { return; }
    if (this.registr.aceptacion) {
      const valido = await this.usuarioService.registro(this.registr);
      if (valido) {
        this.uiservice.alertaInformativa('Usuario Registrado');
        this.mostrarRegistro();
      } else {
        this.uiservice.alertaInformativa('El usuario o celular ya existe');
      }
    }
    else {
      this.uiservice.alertaInformativa('Para registrarse debe Aceptar los Terminos y Condiciones');
    }
  }
}
