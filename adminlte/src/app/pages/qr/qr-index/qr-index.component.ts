import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment.prod';
import {LoginService} from 'src/app/login/login.service';
import {ToastrService} from 'ngx-toastr';
import {Qr} from 'src/app/models/qr';
import {QrService} from '../qr.service';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-qr-index',
  templateUrl: './qr-index.component.html',
  styleUrls: ['./qr-index.component.scss']
})
export class QrIndexComponent implements OnInit {
  public base = environment.servidor;
  public token;
  public identity;
  public qrs: Qr;
  public cols: any[];

  constructor(
    private toastr: ToastrService,
    private qrService: QrService,
    private loginService: LoginService
  ) {
    this.token = this.loginService.getToken();
    this.identity = this.loginService.getIdentity();
  }

  ngOnInit(): void {
    this.getqrs();
  }

  getqrs() {
    this.qrService.getQrs(this.token).subscribe(response => {
        this.qrs = response.qrs;
        this.cols = [
          {field: 'id', header: 'Qr'},
          {field: 'nombre', header: 'Nombre'},
          {field: 'tiempo', header: 'Tiempo'},
          {field: 'estado', header: 'Estado'}
        ];
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
        this.getqrs();
      } else {
        this.toastr.error('Uppp!', response.message);
      }
    }, error => {
      this.toastr.error('Uppp!', 'comuniquese con el Administrador');
    });
  }

  print(qr: any) {
    const canvas: any = document.getElementById(`qr-${qr.id}`).childNodes[0].childNodes[0];
    const imgData = canvas.toDataURL('image/jpeg', 2.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'b5'
    });
    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.setFontSize(10);
    pdf.text(13, 30, qr.nombre, 'center');
    pdf.output('dataurlnewwindow', `QR ${qr.nombre}.pdf`);
  }
  
}


