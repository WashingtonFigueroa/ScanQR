import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { Cupo } from 'src/app/models/cupo.models';
import { CupoService } from '../cupo.service';

@Component({
  selector: 'app-cupo-create',
  templateUrl: './cupo-create.component.html',
  styleUrls: ['./cupo-create.component.scss']
})
export class CupoCreateComponent implements OnInit {
  public title: string;
  public cupo: Cupo;
  public identity;
  public token;
  public base = environment.servidor;


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private cupoService: CupoService
  ) {
    this.title = 'Crear cupo';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.cupo = new Cupo (1, 1, '', '', '', '', 1);
  }
  ngOnInit(): void {
  }

  onSubmit(form) {
    console.log(this.cupo);
    this.cupoService.guardar(this.token, this.cupo).subscribe(response => {
        this.toastr.success('Ok.', 'Cupo Registrado');
        form.reset();
        this.router.navigate(['/cupo']);
    }, error => {
      this.toastr.error('Uppp!', 'verifique los valores');
    });
  }
}
