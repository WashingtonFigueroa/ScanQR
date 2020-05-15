import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router, ActivatedRoute } from '@angular/router'
import { Beneficio } from 'src/app/models/beneficio';
import { BeneficioService } from '../beneficio.service';
import { EmpresaService } from '../../empresa/empresa.service';
import { Empresa } from 'src/app/models/empresa';
@Component({
  selector: 'app-beneficio-edit',
  templateUrl: '../beneficio-create/beneficio-create.component.html',
  styleUrls: ['../beneficio-create/beneficio-create.component.scss']
  // templateUrl: './beneficio-edit.component.html',
  // styleUrls: ['./beneficio-edit.component.scss']
})
export class BeneficioEditComponent implements OnInit {
  public title: string;
  public beneficio: Beneficio;
  public empresas: Empresa;
  public beneficioid: number;
  public identity;
  public token;
  public base = environment.servidor;

   constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private beneficioService: BeneficioService,
    private empresaService: EmpresaService
  ) {
    this.title = 'Editar Beneficio';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.beneficio = new Beneficio (1, 1, '', 1);

    this.route.params.subscribe((param: any) => {
      this.beneficioid = param.id;
      this.beneficioService.show(this.beneficioid)
          .subscribe((res: any) => {
              this.beneficio = res.beneficio;
          });
  });

  }
  ngOnInit(): void {
    this.getEmpresas();
  }

  onSubmit(form) {
    this.beneficioService.update(this.token, this.beneficio, this.beneficio.beneficio_id).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'Datos Actualizados');
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
