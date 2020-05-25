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
    this.empresaService.getEstablecimientos(this.token).subscribe(response => {
        this.empresas = response;
        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'direccion', header: 'Dirección' },
            { field: 'telefono', header: 'Teléfono' },
            { field: 'estado', header: 'Estado' }
        ];
    }, error => {
      console.log(error);
    });
  }

  selectCarWithButton(car: Empresa) {
    console.log(car.id);
  }

  deleteEmpresa(id) {
    this.empresaService.delete(this.token, id).subscribe(response => {
        this.toastr.success('Ok.', 'Empresa Eliminada');
        this. getEmpresas();
    }, error => {
      this.toastr.error('Uppp!', 'verifique los valores');
    });
  }
}


