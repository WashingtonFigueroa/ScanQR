import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargo';
import { CargoService } from '../cargo.service';

@Component({
  selector: 'app-cargo-create',
  templateUrl: './cargo-create.component.html',
  styleUrls: ['./cargo-create.component.scss']
})
export class CargoCreateComponent implements OnInit {
  public title: string;
  public cargo: Cargo;
  public identity;
  public token;
  public base = environment.servidor;


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private cargoService: CargoService
  ) {
    this.title = 'Crear Cargo';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.cargo = new Cargo (1, '', '', 1);
  }
  ngOnInit(): void {
  }

  onSubmit(form) {
    this.cargoService.guardar(this.token, this.cargo).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'cargo Registrado');
        form.reset();
        this.router.navigate(['/cargo']);
      } else {
        this.toastr.error('Uppp!', response.message);
      }
    }, error => {
      this.toastr.error('Uppp!', 'comuniquese con el Administrador');
    });
  }
}
