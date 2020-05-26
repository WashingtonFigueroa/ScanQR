import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cargo } from 'src/app/models/cargo';
import { CargoService } from '../cargo.service';

@Component({
  selector: 'app-cargo-edit',
  templateUrl: '../cargo-create/cargo-create.component.html',
  styleUrls: ['../cargo-create/cargo-create.component.scss']
  // templateUrl: './cargo-edit.component.html',
  // styleUrls: ['./cargo-edit.component.scss']
})
export class CargoEditComponent implements OnInit {
  public title: string;
  public cargo: Cargo;
  public id: number;
  public identity;
  public token;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cargoService: CargoService
  ) {
    this.title = 'Editar Cargo';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.cargo = new Cargo (1, '', '', 1);

    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      this.cargoService.show(this.token, this.id)
          .subscribe((res: any) => {
              this.cargo = res;
          });
    });
  }

  ngOnInit(): void {
  }

   onSubmit(form) {
    this.cargoService.update(this.token, this.cargo, this.cargo.id).subscribe(response => {
        this.toastr.success('Ok.', 'Datos Actualizados');
        form.reset();
        this.router.navigate(['/cargo']);
    }, error => {
      this.toastr.error('Uppp!', 'verifique los valores');
    });
  }
}
