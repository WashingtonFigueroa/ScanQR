import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from 'src/app/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { PlanService } from '../plan.service';
import { Plan } from 'src/app/models/plan.models';

@Component({
  selector: 'app-plan-index',
  templateUrl: './plan-index.component.html',
  styleUrls: ['./plan-index.component.scss']
})
export class PlanIndexComponent implements OnInit {
  public base = environment.servidor;
  public token;
  public plans: Plan;
  public cols: any[];

  constructor(
    private toastr: ToastrService,
    private planService: PlanService,
    private loginService: LoginService
  ) {
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {
     this. getplans();
  }

  getplans() {
    this.planService.getPlans(this.token).subscribe(response => {
        this.plans = response;
        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'detalle', header: 'Detalle' },
            { field: 'estado', header: 'Estado' }
        ];
    }, error => {
      console.log(error);
    });
  }

  selectCarWithButton(car: Plan) {
    console.log(car.id);
  }

  deleteplan(id) {
    this.planService.delete(this.token, id).subscribe(response => {
        this.toastr.success('Ok.', 'Plan Eliminado');
        this. getplans();
    }, error => {
      this.toastr.error('Uppp!', 'verifique los valores');
    });
  }
}


