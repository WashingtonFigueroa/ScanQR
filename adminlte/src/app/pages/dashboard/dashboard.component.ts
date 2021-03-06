import {Component, OnInit} from '@angular/core';
import {HistorialService} from '../../utils/services/historial.service';
import {ToastrService} from 'ngx-toastr';
import {Historial} from '../../models/historial';
import {LoginService} from '../../login/login.service';


interface Stats {
  habilitados: number;
  ingreso: number;
  salida: number;
  salida_retraso: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public identity;
  enabledMessage: boolean = false;
  stats: Stats = null;
  ingresos: Historial[] = null;
  now = new Date();
  usuario = null;
  message: {
    class: string,
    text: string,
    heading: string
  } = null;

  cargaGastoSaldo: {
    carga: number,
    gasto: number,
    saldo: number
  };

  constructor(private historialService: HistorialService,
              private loginService: LoginService,
              private toastr: ToastrService) {
    this.identity = this.loginService.getIdentity();
  }

  ngOnInit() {
    this.usuario = this.loginService.getIdentity();
    this.historialService.cargaGastoSaldo()
      .subscribe((data: any) => {
        this.cargaGastoSaldo = data;
      });
    this.historialService.stats()
      .subscribe((stats: Stats) => {
        this.stats = stats;
      });
    this.historialService.ingresosHoy()
      .subscribe((ingresos: Historial[]) => {
        this.ingresos = ingresos;
      });
  }

  reload() {
    this.historialService.stats()
      .subscribe((stats: Stats) => {
        this.stats = stats;
      });
    this.historialService.ingresosHoy()
      .subscribe((ingresos: Historial[]) => {
        this.ingresos = ingresos;
      });
  }

  reset() {
    this.enabledMessage = false;
    this.message = null;
  }

  scanned($event) {
    const audio = new Audio('assets/pip.mp3');
    audio.play();
    this.historialService.store({
      codigo: $event
    }).subscribe((response: {
      tiempo_transcurrido: string,
      type: string,
      observacion: string,
    }) => {
      switch (response.type) {
        case 'info':
          this.toastr.success(response.observacion, 'INGRESO');
          this.enabledMessage = true;
          this.message = {
            class: 'success',
            text: response.observacion,
            heading: 'INGRESO'
          };
          break;
        case 'success':
          this.toastr.info(response.observacion, 'SALIDA');
          this.enabledMessage = true;
          this.message = {
            class: 'info',
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
      }
      this.reload();
    })
  }
}
