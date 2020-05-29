import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment.prod';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from 'src/app/login/login.service';
import {Router} from '@angular/router';
import {Cupo} from 'src/app/models/cupo.models';
import {CupoService} from '../cupo.service';
import {EmpresaService} from '../../empresa/empresa.service';

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
  public establecimientos: any[] = null;


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private cupoService: CupoService,
    private establecimientoService: EmpresaService,
  ) {
    this.title = 'Crear cupo';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.cupo = new Cupo(null, null, 0, null, null, null, true);
  }

  ngOnInit(): void {
    this.establecimientoService.getEstablecimientos(this.token)
      .subscribe((establecimientos: any[]) => {
        this.establecimientos = establecimientos;
      });
  }

  onSubmit(form) {
    this.cupoService.guardar(this.token, this.cupo).subscribe(response => {
      this.toastr.success('Ok.', 'Cupo Registrado');
      form.reset();
      this.router.navigate(['/cupo']);
    }, error => {
      if (typeof error.error.error === 'string') {
        this.toastr.error(error.error.error, 'Fecha pasada');
      } else {
        this.toastr.error('Se perdió la conexión al servidor', 'Error de conexión',);
      }
    });
  }
}
