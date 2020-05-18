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
  enabledMessage: boolean = false;
  message: {
    class: string,
    text: string,
    heading: string
  } = null;

  constructor(private historialService: HistorialService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  reset() {
    this.enabledMessage = false;
    this.message = null;
  }

  scanned($event) {
    this.codigo = $event;
    this.historialService.store({
      codigo: $event
    }).subscribe((response: {
      tiempo_transcurrido: string,
      type: string,
      observacion: string,
    }) => {
      this.codigo = '';
      switch (response.type) {
        case 'info':
          this.toastr.info(response.observacion, 'INGRESO');
          this.enabledMessage = true;
          this.message = {
            class: 'info',
            text: response.observacion,
            heading: 'INGRESO'
          };
          break;
        case 'success':
          this.toastr.success(response.observacion, 'SALIDA');
          this.enabledMessage = true;
          this.message = {
            class: 'success',
            text: response.observacion,
            heading: 'SALIDA EXITOSA'
          };
          break;
        case 'warning':
          this.toastr.warning(response.observacion, 'RETRASO');
          this.enabledMessage = true;
          this.message = {
            class: 'warning',
            text: response.observacion,
            heading: 'SALIDA CON RETRASO'
          };
          break;
        case 'error':
          this.toastr.error(response.observacion, 'ERROR');
          this.enabledMessage = true;
          this.message = {
            class: 'danger',
            text: response.observacion,
            heading: 'ERROR'
          };
          break;
        case 'timeout':
          this.enabledMessage = false;
          this.message = null;
          break;
      }
    })
  }
}
