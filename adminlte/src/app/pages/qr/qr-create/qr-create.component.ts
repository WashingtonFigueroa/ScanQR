import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment.prod';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from 'src/app/login/login.service';
import {Router} from '@angular/router';
import {Qr} from 'src/app/models/qr';
import {QrService} from '../qr.service';
import { User } from 'src/app/models/user';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-qr-create',
  templateUrl: './qr-create.component.html',
  styleUrls: ['./qr-create.component.scss']
})
export class QrCreateComponent implements OnInit {
  public title: string;
  public qr: Qr;
  public usuarios: User;
  public identity;
  public token;
  public base = environment.servidor;


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private qrService: QrService
  ) {
    this.title = 'Crear Qr';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.qr = new Qr(1, 1, '', '', 1, 'Activo');
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  onSubmit(form) {
    this.qrService.guardar(this.token, this.qr).subscribe(response => {
        this.toastr.success('Ok.', 'Qr Registrado');
        form.reset();
        this.router.navigate(['/qr']);
    }, error => {
      this.toastr.error('Uppp!', 'comuniquese con el Administrador');
    });
  }

  getUsuarios() {
    this.usuarioService.getListaUsuarios(this.token).subscribe(response => {
        this.usuarios = response.usuarios;
    }, error => {
      console.log(error);
    });
  }

}
