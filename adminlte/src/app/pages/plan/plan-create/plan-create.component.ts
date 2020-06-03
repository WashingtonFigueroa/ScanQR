import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan.models';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-plan-create',
  templateUrl: './plan-create.component.html',
  styleUrls: ['./plan-create.component.scss']
})
export class PlanCreateComponent implements OnInit {
  public title: string;
  public plan: Plan;
  public identity;
  public token;
  public base = environment.servidor;


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private planService: PlanService
  ) {
    this.title = 'Crear Plan';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.plan = new Plan (1, '', '', 1);
  }
  ngOnInit(): void {
  }

  onSubmit(form) {
    console.log(this.plan);
    this.planService.guardar(this.token, this.plan).subscribe(response => {
        this.toastr.success('Ok.', 'plan Registrado');
        form.reset();
        this.router.navigate(['/plan']);
    }, error => {
      this.toastr.error('Uppp!', 'verifique los valores');
    });
  }
}
