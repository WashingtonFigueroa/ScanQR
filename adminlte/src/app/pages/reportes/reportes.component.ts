import {Component, OnInit} from '@angular/core';
import {HistorialService} from '../../utils/services/historial.service';
import {Historial} from '../../models/historial';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  historial: Historial[] = [];
  buscarGroup: FormGroup;

  constructor(private historialService: HistorialService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buscarGroup = this.fb.group({
      desde: new FormControl(null, [Validators.required]),
      hasta: new FormControl(null, [Validators.required]),
      estado: new FormControl(null, [Validators.required]),
      codigo: new FormControl(''),
    });
    this.historialService.index()
      .subscribe((historial: Historial[]) => {
        this.historial = historial;
      });
  }

  reload() {
    this.historialService.index()
      .subscribe((historial: Historial[]) => {
        this.historial = historial;
      });
  }

  buscar() {
    this.historialService.buscarHistorial(this.buscarGroup.value)
      .subscribe(() => {

      });
  }


}
