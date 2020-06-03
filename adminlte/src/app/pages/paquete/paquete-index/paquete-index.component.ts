import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from 'src/app/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Paquete } from 'src/app/models/paquete.models';
import { PaqueteService } from '../paquete.service';

@Component({
  selector: 'app-paquete-index',
  templateUrl: './paquete-index.component.html',
  styleUrls: ['./paquete-index.component.scss']
})
export class PaqueteIndexComponent implements OnInit {
  public base = environment.servidor;
  public token;
  public paquetes: Paquete;
  public cols: any[];

  constructor(
    private toastr: ToastrService,
    private paqueteService: PaqueteService,
    private loginService: LoginService
  ) {
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {
     this. getpaquetes();
  }

  getpaquetes() {
    this.paqueteService.getPaquetes(this.token).subscribe(response => {
        this.paquetes = response;
        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'plan', header: 'Plan' },
            { field: 'cupo', header: 'Cupo' },
            { field: 'valor', header: 'Valor' }
        ];
    }, error => {
      console.log(error);
    });
  }

  selectCarWithButton(paq: Paquete) {
    console.log(paq.id);
  }

  deletepaquete(id) {
    this.paqueteService.delete(this.token, id).subscribe(response => {
        this.toastr.success('Ok.', 'Paquete Eliminada');
        this. getpaquetes();
    }, error => {
      this.toastr.error('Uppp!', 'verifique los valores');
    });
  }
}


