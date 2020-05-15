import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-index',
  templateUrl: './solicitud-index.component.html',
  styleUrls: ['./solicitud-index.component.scss']
})
export class SolicitudIndexComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  newSolicitd() {
    this.router.navigate(['/solicitud/create']);
  }
}
