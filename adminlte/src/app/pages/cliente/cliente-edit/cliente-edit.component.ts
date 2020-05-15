import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UsuarioService } from '../../usuario/usuario.service';
import { LoginService } from 'src/app/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: '../cliente-create/cliente-create.component.html',
  styleUrls: ['../cliente-create/cliente-create.component.scss']
  // templateUrl: './cliente-edit.component.html',
  // styleUrls: ['./cliente-edit.component.scss']
})
export class ClienteEditComponent implements OnInit {
  public title: string;
  public user: User;
  public userid: number;
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
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = 'Editar Cliente';
    this.user = new User(1, 'role_cliente', '', '', '', '', '', '', '', null, '');
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();

    this.route.params.subscribe((param: any) => {
      this.userid = param.id;
      this.usuarioService.show(this.userid)
          .subscribe((res: any) => {
              this.user = res.user;
          });
  });

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

  onSubmit(form) {
    let date = JSON.stringify(this.user.fecha_nacimiento);
    date = date.slice(1, 11);
    this.user.fecha_nacimiento = date;
    this.usuarioService.modificar(this.token, this.user, this.user.user_id).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'Datos Actualizados');
        form.reset();
        this.router.navigate(['/cliente']);
      } else {
        this.toastr.error('Uppp!', response.message);
      }
    }, error => {
      this.toastr.error('Uppp!', 'comuniquese con el Administrador');
    });
  }

}
