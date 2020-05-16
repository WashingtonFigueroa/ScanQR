import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from 'src/app/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Qr } from 'src/app/models/qr';
import { QrService } from '../qr.service';

@Component({
  selector: 'app-qr-index',
  templateUrl: './qr-index.component.html',
  styleUrls: ['./qr-index.component.scss']
})
export class QrIndexComponent implements OnInit {
  public base = environment.servidor;
  public token;
  public qrs: Qr;
  public cols: any[];

  constructor(
    private toastr: ToastrService,
    private qrService: QrService,
    private loginService: LoginService
  ) {
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {
     this. getqrs();
  }

  getqrs() {
    this.qrService.getQrs().subscribe(response => {
      console.log(response.status);
      if (response.status === 'success') {
        this.qrs = response.qrs;
        this.cols = [
            { field: 'id', header: 'Qr' },
            { field: 'tiempo', header: 'Tiempo' },
            { field: 'estado', header: 'Estado' }
        ];
      } else {
        console.log('error');
      }
    }, error => {
      console.log(error);
    });
  }

  selectCarWithButton(car: Qr) {
    console.log(car.id);
  }

  deleteQr(id) {
    this.qrService.delete(this.token, id).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'QR Eliminado');
        this. getqrs();
      } else {
        this.toastr.error('Uppp!', response.message);
      }
    }, error => {
      this.toastr.error('Uppp!', 'comuniquese con el Administrador');
    });
  }
}


