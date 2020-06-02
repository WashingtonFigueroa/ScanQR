import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment.prod';
import {ToastrService} from 'ngx-toastr';
import {User} from 'src/app/models/user';
import {UsuarioService} from '../../usuario/usuario.service';
import {LoginService} from 'src/app/login/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CargoService} from '../../cargo/cargo.service';
import {Cargo} from 'src/app/models/cargo';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../../empresa/empresa.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: '../usuario-create/usuario-create.component.html',
  styleUrls: ['../usuario-create/usuario-create.component.scss']
  // templateUrl: './usuario-edit.component.html',
  // styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {
  public title: string;
  public b: number;
  public user: User = null;
  public cargos: Cargo;
  public empresas: Empresa;
  public id: number;
  public identity;
  public token;
  public base = environment.servidor;
  es: any;

  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif',
    maxSize: '50',
    uploadAPI: {
      url: this.base + 'user/upload',
      headers: {
        'Authorization': this.loginService.getToken()
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
    private router: Router,
    private cargoService: CargoService,
    private establecimientoService: EmpresaService
  ) {
    this.title = 'Editar Usuario';
    this.user = new User(1, 2, 1, '', '', '', '', '', '', '', null, '');
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.b = 0;
  }

  clave() {
    this.b = 1;
  }

  ngOnInit() {
    this.getCargos();
    this.getEstablecimietos();
    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      this.usuarioService.show(this.token, this.id)
        .subscribe((res: any) => {
          this.user = res.usuario;
        });
    });

  }

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.user.image = data.image;
  }

  resetVar() {
  }

  onSubmit(form) {
    let date = JSON.stringify(this.user.fecha_nacimiento);
    date = date.slice(1, 11);
    this.user.fecha_nacimiento = date;
    this.usuarioService.update(this.token, this.user, this.user.id).subscribe(response => {
      this.toastr.success('Ok.', 'Datos Actualizados');
      form.reset();
      this.router.navigate(['/usuario']);
    }, error => {
      this.toastr.error('Ups!', 'Comuniquese con el Administrador');
    });
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
