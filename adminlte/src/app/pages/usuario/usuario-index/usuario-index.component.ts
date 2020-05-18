import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from 'src/app/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../usuario/usuario.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-usuario-index',
  templateUrl: './usuario-index.component.html',
  styleUrls: ['./usuario-index.component.scss']
})
export class UsuarioIndexComponent implements OnInit {

  public base = environment.servidor;
  public token;
  public usuarios: User;
  public cols: any[];

  constructor(
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private loginService: LoginService
  ) {
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {
     this. getUser();
  }

  getUser() {
    this.usuarioService.getUsuarios(this.token).subscribe(response => {
      if (response.status === 'success') {
        this.usuarios = response.usuarios;
        this.cols = [
            { field: 'cedula', header: 'Cedula' },
            { field: 'name', header: 'Nombre' },
            { field: 'email', header: 'Email' },
            { field: 'direccion', header: 'Dirección' },
            { field: 'telefono', header: 'Teléfono' },
            { field: 'fecha_nacimiento', header: 'fecha_nacimiento' },
            { field: 'imagen', header: 'Foto' }
        ];
      } else {
        console.log('error');
      }
    }, error => {
      console.log(error);
    });
  }

  selectCarWithButton(car: User) {
    console.log(car.id);
  }

  deleteRepartidor(id) {
    this.usuarioService.delete(this.token, id).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'Repartidor Suspendido');
        this. getUser();
      } else {
        this.toastr.error('Uppp!', response.message);
      }
    }, error => {
      this.toastr.error('Uppp!', 'comuniquese con el Administrador');
    });
  }
}
