import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Plan } from 'src/app/models/plan.models';
import { Paquete } from 'src/app/models/paquete.models';
import { PaqueteService } from '../paquete.service';
import { PlanService } from '../../plan/plan.service';

@Component({
  selector: 'app-paquete-edit',
  templateUrl: '../paquete-create/paquete-create.component.html',
  styleUrls: ['../paquete-create/paquete-create.component.scss']
  // templateUrl: './paquete-edit.component.html',
  // styleUrls: ['./paquete-edit.component.scss']
})
export class PaqueteEditComponent implements OnInit {
  public title: string;
  public paquete: Paquete;
  public planes: Plan;
  public id: number;
  public identity;
  public token;
  public today: Date;
 
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private paqueteService: PaqueteService,
    private planService: PlanService
  ) {
    this.title = 'Editar Paquete';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.paquete = new Paquete (1, 1, 1, 1, 1);
    this.today = new Date();

    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      this.paqueteService.show(this.token, this.id)
          .subscribe((res: any) => {
              this.paquete = res;
          });
    });
  }

  ngOnInit(): void {
    this.getplans();
  }
   onSubmit(form) {
    this.paqueteService.update(this.token, this.paquete, this.paquete.id).subscribe(response => {
        this.toastr.success('Ok.', 'Datos Actualizados');
        form.reset();
        this.router.navigate(['/paquete']);
    }, error => {
      this.toastr.error('Uppp!', 'verifique los valores');
    });
  }

  getplans() {
    this.planService.getPlans(this.token).subscribe(response => {
        this.planes = response;
    }, error => {
      console.log(error);
    });
  }
}
