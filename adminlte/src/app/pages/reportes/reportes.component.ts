import {Component, OnInit} from '@angular/core';
import {HistorialService} from '../../utils/services/historial.service';
import {Historial} from '../../models/historial';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  historial: Historial[] = [];

  constructor(private historialService: HistorialService) {
  }

  ngOnInit(): void {
    this.historialService.index()
      .subscribe((historial: Historial[]) => {
        this.historial = historial;
      });
  }


}
