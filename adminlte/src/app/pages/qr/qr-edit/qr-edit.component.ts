import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Qr } from 'src/app/models/qr';
import { QrService } from '../qr.service';
import { User } from 'src/app/models/user';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-qr-edit',
  templateUrl: '../qr-create/qr-create.component.html',
  styleUrls: ['../qr-create/qr-create.component.scss']
  // templateUrl: './qr-edit.component.html',
  // styleUrls: ['./qr-edit.component.scss']
})
export class QrEditComponent implements OnInit {
  public title: string;
  public qr: Qr;
  public usuarios: User;
  public id: number;
  public identity;
  public token;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private qrService: QrService,
    private usuarioService: UsuarioService
  ) {
    this.title = 'Editar Qr';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.qr = new Qr(1, 1, '', '', 1, 'Activo');

    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      this.qrService.show(this.token, this.id)
          .subscribe((res: any) => {
              this.qr = res.qr;
          });
  });

  }

  ngOnInit(): void {
    this.getUsuarios();
  }

   onSubmit(form) {
    this.qrService.update(this.token, this.qr, this.qr.id).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'Datos Actualizados');
        form.reset();
        this.router.navigate(['/qr']);
      } else {
        this.toastr.error('Uppp!', response.message);
      }
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
