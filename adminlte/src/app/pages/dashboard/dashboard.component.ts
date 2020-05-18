import {Component, OnInit} from '@angular/core';
import {HistorialService} from '../../utils/services/historial.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  codigo: string = '';
  enabled = true;

  constructor(private historialService: HistorialService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  scanned($event) {
    setTimeout(() => {
      this.codigo = $event;
      this.enabled = false;
      this.historialService.store({
        codigo: $event
      }).subscribe((response: {
        tiempo_transcurrido: string,
        type: string,
        observacion: string,
      }) => {
        this.codigo = '';
        console.log(response);
        switch (response.type) {
          case 'info':
            this.toastr.info(response.observacion, 'INGRESO');
            break;
          case 'success':
            this.toastr.success(response.observacion, 'SALIDA');
            break;
          case 'error':
            this.toastr.error(response.observacion, 'ERROR');
            break;
        }
      })
    }, 1000);
  }
}
