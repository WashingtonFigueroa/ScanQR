import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment.prod';
import {LoginService} from 'src/app/login/login.service';
import {ToastrService} from 'ngx-toastr';
import {CupoService} from '../cupo.service';
import {Cupo} from 'src/app/models/cupo.models';

@Component({
  selector: 'app-cupo-index',
  templateUrl: './cupo-index.component.html',
  styleUrls: ['./cupo-index.component.scss']
})
export class CupoIndexComponent implements OnInit {
  public base = environment.servidor;
  public token;
  public cupos: Cupo;
  public cols: any[];

  constructor(
    private toastr: ToastrService,
    private cupoService: CupoService,
    private loginService: LoginService
  ) {
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {
    this.getcupos();
  }

  getcupos() {
    this.cupoService.getCupos(this.token).subscribe(response => {
      this.cupos = response;
      this.cols = [
        {field: 'id', header: 'ID'},
        {field: 'establecimiento_id', header: 'Establecimiento'},
        {field: 'carga', header: 'Carga'},
        {field: 'gasto', header: 'Gasto'},
        {field: 'saldo', header: 'Saldo'}
      ];
    }, error => {
      console.log(error);
    });
  }

  selectCarWithButton(car: Cupo) {
    console.log(car.id);
  }

  deleteCupo(id) {
    this.cupoService.delete(this.token, id).subscribe(response => {
      this.toastr.success('Ok.', 'Cupo Eliminado');
      this.getcupos();
    }, error => {
      this.toastr.error('Ups!', 'Verifique los valores');
    });
  }

  activarCupo(id) {
    this.cupoService.activarCupo(this.token, id).subscribe(response => {
      this.toastr.success('Ok.', 'Cupo Activado');
      this.getcupos();
    }, error => {
      this.toastr.error('Ups!', 'Verifique los valores');
    });
  }

  inactivarCupo(id) {
    this.cupoService.inactivarCupo(this.token, id).subscribe(response => {
      this.toastr.success('Ok.', 'Cupo Inactivado');
      this.getcupos();
    }, error => {
      this.toastr.error('Ups!', 'Verifique los valores');
    });
  }
}


