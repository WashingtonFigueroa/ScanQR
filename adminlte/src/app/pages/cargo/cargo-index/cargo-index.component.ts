import { Component, OnInit } from '@angular/core';
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
        this.cargos = response;
        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' }
        ];
    }, error => {
      console.log(error);
    });
  }

  selectCarWithButton(car: Cargo) {
    console.log(car.id);
  }

  deleteCargo(id) {
    this.cargoService.delete(this.token, id).subscribe(response => {
        this.toastr.success('Ok.', 'Cargo Eliminado');
        this. getcargos();
    }, error => {
      this.toastr.error('Uppp!', 'verifique los valores');
    });
  }
}


