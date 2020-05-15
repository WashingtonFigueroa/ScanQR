import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { Beneficio } from 'src/app/models/beneficio';
import { BeneficioService } from '../beneficio.service';
import { EmpresaService } from '../../empresa/empresa.service';
import { Empresa } from 'src/app/models/empresa';

@Component({
  selector: 'app-beneficio-create',
  templateUrl: './beneficio-create.component.html',
  styleUrls: ['./beneficio-create.component.scss']
})
export class BeneficioCreateComponent implements OnInit {
  public title: string;
  public beneficio: Beneficio;
  public empresas: Empresa;
  public identity;
  public token;
  public base = environment.servidor;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private beneficioService: BeneficioService,
    private empresaService: EmpresaService
  ) {
    this.title = 'Crear Beneficio';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.beneficio = new Beneficio (1, 1, '', 1);
  }
  ngOnInit(): void {
    this.getEmpresas();
  }

  onSubmit(form) {
    this.beneficioService.create(this.token, this.beneficio).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'Beneficio Registrado');
        form.reset();
        this.router.navigate(['/beneficios']);
      } else {
        this.toastr.error('Uppp!', response.message);
      }
    }, error => {
      this.toastr.error('Uppp!', 'comuniquese con el Administrador');
    });
  }

  getEmpresas() {
    this.empresaService.getEmpresas().subscribe(response => {
      if (response.status === 'success') {
        this.empresas = response.empresas;
      } else {
        console.log('error');
      }
    }, error => {
      console.log(error);
    });
  }
}
