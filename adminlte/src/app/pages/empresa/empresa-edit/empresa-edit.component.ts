import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../empresa.service';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Plan } from 'src/app/models/plan.models';
import { PlanService } from '../../plan/plan.service';

@Component({
  selector: 'app-empresa-edit',
  templateUrl: '../empresa-create/empresa-create.component.html',
  styleUrls: ['../empresa-create/empresa-create.component.scss']
  // templateUrl: './empresa-edit.component.html',
  // styleUrls: ['./empresa-edit.component.scss']
})
export class EmpresaEditComponent implements OnInit {
  public title: string;
  public empresa: Empresa;
  public planes: Plan;
  public id: number;
  public identity;
  public token;
  public base = environment.servidor;

  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif',
    maxSize: '50',
    uploadAPI:  {
      url: this.base + 'empresa/upload',
      headers: {
     'Authorization' : this.loginService.getToken()
      }
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Subir logo empresa',
      resetBtn: 'limpiar',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Subir logo empresa     .',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private empresaService: EmpresaService,
    private planService: PlanService,
  ) {
    this.title = 'Editar Establecimiento';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.empresa = new Empresa (1, 1, '', '', '', '', '', '', '', 1, 1, '',  1);

    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      this.empresaService.show(this.token, this.id)
          .subscribe((res: any) => {
              this.empresa = res;
          });
  });

  }
  ngOnInit(): void {
    this.getplanes();
  }

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.empresa.logo = data.image;
  }

  resetVar() {}

  onSubmit(form) {
    this.empresaService.update(this.token, this.empresa, this.empresa.id).subscribe(response => {
        this.toastr.success('Ok.', 'Datos Actualizados');
        form.reset();
        this.router.navigate(['/empresa']);
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
