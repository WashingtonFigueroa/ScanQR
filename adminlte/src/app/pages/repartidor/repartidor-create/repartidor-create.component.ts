import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-repartidor-create',
  templateUrl: './repartidor-create.component.html',
  styleUrls: ['./repartidor-create.component.scss']
})
export class RepartidorCreateComponent implements OnInit {
  public title: string;
  public cedula: string;
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
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private userService: UsuarioService
  ) {
    this.title = 'Crear Repartidor';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.user = new User(1, 'role_repartidor', '', '', '', '', '', '', '', null, '');
  }

  ngOnInit(): void {
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

  onSubmit(form) {
    // if (this.validarCedula() === true) {
      if (this.user.password  === this.user.password2) {
        let date = JSON.stringify(this.user.fecha_nacimiento);
        date = date.slice(1, 11);
        this.user.fecha_nacimiento = date;
        this.userService.register(this.user).subscribe(response => {
          if (response.status === 'success') {
            this.toastr.success('Ok.', 'Repartidor Registrado');
            form.reset();
            this.router.navigate(['/repartidor']);
          } else {
            this.toastr.error('Uppp!', response.message);
          }
        }, error => {
          this.toastr.error('Uppp!', 'comuniquese con el Administrador');
        });
      } else {
        this.toastr.error('Uppp!', 'Contraseña Incorrecta');
        this.user.password = '';
        this.user.password2 = '';
      }
    // } else {
    //   this.toastr.error('Uppp!', 'Cedula Incorrecta');
    //   this.user.cedula = '';
    // }
  }
}
