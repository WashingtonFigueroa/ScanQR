import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UsuarioService } from '../usuario/usuario.service';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from '../../login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public identity;
  public token;
  public base = environment.servidor;
  es: any;

  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif',
    maxSize: '50',
    uploadAPI:  {
      url: this.base + 'user/upload',
      headers: {
     'Authorization' : this.loginService.getToken()
      }
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Sube imagen de perfil',
      resetBtn: 'limpiar',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen de perfil...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.user = new User(1, 'ROLE_USER', '', '', '', '', '', '', '', null, '');
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.user = new User (
      this.identity.sub,
      this.identity.role,
      this.identity.cedula,
      this.identity.name,
      this.identity.email, '', '',
      this.identity.direccion,
      this.identity.telefono,
      this.identity.fecha_nacimiento,
      this.identity.image);
  }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
       'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk'
  };
  }

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.user.image = data.image;
  }

  resetVar() {}

  onSubmit( form ) {
    let date = JSON.stringify(this.user.fecha_nacimiento);
    date = date.slice(1, 11);
    this.user.fecha_nacimiento = date;
    this.usuarioService.update(this.token, this.user).subscribe(response => {
      if (response && response.status) {
        this.toastr.success('Ok.', 'Datos Actulizados');
        if (response.name) {
          this.user.name = response.name;
        }
        if (response.email) {
          this.user.email = response.email;
        }
        if (response.image) {
          this.user.image = response.image;
        }
        this.identity = this.user;
        localStorage.setItem('identity' , JSON.stringify(this.identity));
      } else {
        this.toastr.error('Uppp!', 'Datos incorrectos');
      }
    }, error => {
        console.log(error);
        this.toastr.error('Uppp!', 'Datos incorrectos');
    });
  }

}
