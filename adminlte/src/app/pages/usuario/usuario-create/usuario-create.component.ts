import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsuarioService } from '../../usuario/usuario.service';
import { Cargo } from 'src/app/models/cargo';
import { CargoService } from '../../cargo/cargo.service';
import { EmpresaService } from '../../empresa/empresa.service';
import { Empresa } from 'src/app/models/empresa';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.scss']
})
export class UsuarioCreateComponent implements OnInit {
  public title: string;
  public cedula: string;
  public user: User;
  public cargos: Cargo;
  public empresas: Empresa;
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
    private userService: UsuarioService,
    private cargoService: CargoService,
    private establecimientoService: EmpresaService
  ) {
    this.title = 'Crear Usuario';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.user = new User(1, 2, 1, '', '', '', '', '', '', '', null, '');
  }

  ngOnInit(): void {
    this.getCargos();
    this.getEstablecimietos();
  }

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.user.image = data.image;
  }

  resetVar() {}

  onSubmit(form) {
      if (this.user.password  === this.user.password2) {
        let date = JSON.stringify(this.user.fecha_nacimiento);
        date = date.slice(1, 11);
        this.user.fecha_nacimiento = date;
        this.userService.guardar(this.token, this.user).subscribe(response => {
          if (response.status === 'success') {
            this.toastr.success('Ok.', 'Usuario Registrado');
            form.reset();
            this.router.navigate(['/usuario']);
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
  }

  getCargos() {
    this.cargoService.getListaCargos(this.token).subscribe(response => {
      if (response.status === 'success') {
        this.cargos = response.cargos;
      } else {
        console.log('error');
      }
    }, error => {
      console.log(error);
    });
  }

  getEstablecimietos() {
    this.establecimientoService.getEstablecimientos(this.token).subscribe(response => {
      this.empresas = response;
    }, error => {
      console.log(error);
    });
  }
}
