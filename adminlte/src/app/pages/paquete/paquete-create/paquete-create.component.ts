import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { Paquete } from 'src/app/models/paquete.models';
import { Plan } from 'src/app/models/plan.models';
import { PaqueteService } from '../paquete.service';
import { PlanService } from '../../plan/plan.service';

@Component({
  selector: 'app-paquete-create',
  templateUrl: './paquete-create.component.html',
  styleUrls: ['./paquete-create.component.scss']
})
export class PaqueteCreateComponent implements OnInit {
  public title: string;
  public paquete: Paquete;
  public planes: Plan;
  public identity;
  public token;
  public today: Date;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private paqueteService: PaqueteService,
    private planService: PlanService
  ) {
    this.title = 'Crear paquete';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.paquete = new Paquete (1, 1, 1, 1, 1);
    this.today = new Date();
  }

  ngOnInit(): void {
    this.getplanes();
  }

  onSubmit(form) {
    this.paqueteService.guardar(this.token, this.paquete).subscribe(response => {
        this.toastr.success('Ok.', 'paquete Registrada');
        form.reset();
        this.router.navigate(['/paquete']);
    }, error => {
      this.toastr.error('Uppp!', 'verifique los valores');
    });
  }

  getplanes() {
    this.planService.getPlans(this.token).subscribe(response => {
        this.planes = response;
    }, error => {
      console.log(error);
    });
  }

}
