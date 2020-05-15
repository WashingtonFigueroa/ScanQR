import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from 'src/app/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Beneficio } from '../../../models/beneficio';
import { BeneficioService } from '../beneficio.service';

@Component({
  selector: 'app-beneficio-index',
  templateUrl: './beneficio-index.component.html',
  styleUrls: ['./beneficio-index.component.scss']
})
export class BeneficioIndexComponent implements OnInit {
  public base = environment.servidor;
  public token;
  public beneficios: Beneficio;
  public cols: any[];

  constructor(
    private toastr: ToastrService,
    private beneficioService: BeneficioService,
    private loginService: LoginService
  ) {
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {
     this. index();
  }

  index() {
    this.beneficioService.index().subscribe(response => {
      console.log(response.status);
      if (response.status === 'success') {
        this.beneficios = response.beneficios;
        this.cols = [
            { field: 'beneficio_id', header: 'ID', width: '20%' },
            { field: 'empresa_id', header: 'Empresa', width: '20%' },
            { field: 'nombre', header: 'Descripcion' , width: '40%'},
            { field: 'estado', header: 'Estado' , width: '20%'}
        ];
      } else {
        console.log('error');
      }
    }, error => {
      console.log(error);
    });
  }

  selectCarWithButton(car: Beneficio) {
    console.log(car.beneficio_id);
}

delete_beneficio(id) {
  this.beneficioService.delete(this.token, id).subscribe(response => {
    if (response.status === 'success') {
      this.toastr.success('Ok.', 'Beneficio Eliminado');
      this. index();
    } else {
      this.toastr.error('Uppp!', response.message);
    }
  }, error => {
    this.toastr.error('Uppp!', 'comuniquese con el Administrador');
  });
}


}

