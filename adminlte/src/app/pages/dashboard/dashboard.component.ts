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

  constructor(private historialService: HistorialService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
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
      console.log(response);
      switch (response.type) {
        case 'info':
          this.toastr.info(response.observacion);
          break;
        case 'success':
          this.toastr.success(response.observacion);
          break;
        case 'error':
          this.toastr.error(response.observacion);
          break;
      }
    })
  }
}
