import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../empresa.service';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from 'src/app/login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empresa-index',
  templateUrl: './empresa-index.component.html',
  styleUrls: ['./empresa-index.component.scss']
})
export class EmpresaIndexComponent implements OnInit {
  public base = environment.servidor;
  public token;
  public empresas: Empresa;
  public cols: any[];

  constructor(
    private toastr: ToastrService,
    private empresaService: EmpresaService,
    private loginService: LoginService
  ) {
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {
     this. getEmpresas();
  }

  getEmpresas() {
    this.empresaService.getEmpresas().subscribe(response => {
      console.log(response.status);
      if (response.status === 'success') {
        this.empresas = response.empresas;
        this.cols = [
            { field: 'empresa_id', header: 'ID' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'direccion', header: 'Dirección' },
            { field: 'telefono', header: 'Teléfono' },
            { field: 'estado', header: 'Estado' }
        ];
      } else {
        console.log('error');
      }
    }, error => {
      console.log(error);
    });
  }

  selectCarWithButton(car: Empresa) {
    console.log(car.empresa_id);
  }

  deleteEmpresa(id) {
    this.empresaService.delete(this.token, id).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'Empresa Eliminada');
        this. getEmpresas();
      } else {
        this.toastr.error('Uppp!', response.message);
      }
    }, error => {
      this.toastr.error('Uppp!', 'comuniquese con el Administrador');
    });
  }
}


