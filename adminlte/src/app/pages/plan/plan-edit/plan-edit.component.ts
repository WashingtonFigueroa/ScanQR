import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Plan } from 'src/app/models/plan.models';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-plan-edit',
  templateUrl: '../plan-create/plan-create.component.html',
  styleUrls: ['../plan-create/plan-create.component.scss']
  // templateUrl: './plan-edit.component.html',
  // styleUrls: ['./plan-edit.component.scss']
})
export class PlanEditComponent implements OnInit {
  public title: string;
  public plan: Plan;
  public id: number;
  public identity;
  public token;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private planService: PlanService
  ) {
    this.title = 'Editar plan';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.plan = new Plan (1, '', '', 1);

    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      this.planService.show(this.token, this.id)
          .subscribe((res: any) => {
              this.plan = res;
          });
    });
  }

  ngOnInit(): void {
  }

   onSubmit(form) {
    this.planService.update(this.token, this.plan, this.plan.id).subscribe(response => {
        this.toastr.success('Ok.', 'Datos Actualizados');
        form.reset();
        this.router.navigate(['/plan']);
    }, error => {
      this.toastr.error('Uppp!', 'verifique los valores');
    });
  }
}
