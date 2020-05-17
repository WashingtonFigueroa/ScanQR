import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from 'src/app/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Cargo } from '../../../models/cargo';
import { CargoService } from '../cargo.service';

@Component({
  selector: 'app-cargo-index',
  templateUrl: './cargo-index.component.html',
  styleUrls: ['./cargo-index.component.scss']
})
export class CargoIndexComponent implements OnInit {
  public base = environment.servidor;
  public token;
  public cargos: Cargo;
  public cols: any[];

  constructor(
    private toastr: ToastrService,
    private cargoService: CargoService,
    private loginService: LoginService
  ) {
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {
     this. getcargos();
  }

  getcargos() {
    this.cargoService.getCargos(this.token).subscribe(response => {
      if (response.status === 'success') {
        this.cargos = response.cargos;
        this.cols = [
            { field: 'cargo_id', header: 'ID' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' }
        ];
      } else {
        console.log('error');
      }
    }, error => {
      console.log(error);
    });
  }

  selectCarWithButton(car: Cargo) {
    console.log(car.cargo_id);
  }

  deleteCargo(id) {
    this.cargoService.delete(this.token, id).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'Cargo Eliminado');
        this. getcargos();
      } else {
        this.toastr.error('Uppp!', response.message);
      }
    }, error => {
      this.toastr.error('Uppp!', 'comuniquese con el Administrador');
    });
  }
}


