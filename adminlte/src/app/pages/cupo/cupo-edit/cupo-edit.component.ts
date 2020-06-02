import {Component, OnInit} from '@angular/core';
import {Cupo} from '../../../models/cupo.models';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../../login/login.service';
import {CupoService} from '../cupo.service';
import {EmpresaService} from '../../empresa/empresa.service';
import { PaqueteService } from '../../paquete/paquete.service';

@Component({
  selector: 'app-cupo-edit',
  templateUrl: './cupo-edit.component.html',
  styleUrls: ['./cupo-edit.component.scss']
})
export class CupoEditComponent implements OnInit {
  public title: string;
  public cupo: Cupo;
  public paquetes: any[] = null;
  public identity;
  public token;
  public establecimientos: any[] = null;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cupoService: CupoService,
    private establecimientoService: EmpresaService,
    private paqueteService: PaqueteService
  ) {
    this.title = 'Editar Cupo';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.cupo = new Cupo(1, 1, 1, 0, null, null, null, true);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.cupoService.show(this.token, params.id)
        .subscribe((cupo: Cupo) => {
          this.cupo = cupo;
        });
    });
    this.establecimientoService.getEstablecimientos(this.token)
      .subscribe((establecimientos: any[]) => {
        this.establecimientos = establecimientos;
      });
    this.paqueteService.getPaquetes(this.token)
    .subscribe((paquetes: any[]) => {
      this.paquetes = paquetes;
    });
  }

  onSubmit(form) {
    this.cupoService.update(this.token, this.cupo, this.cupo.id).subscribe(response => {
      this.toastr.success('Ok.', 'Cupo Actualizado');
      form.reset();
      this.router.navigate(['/cupo']);
    }, error => {
      this.toastr.error('Se perdió la conexión al servidor', 'Error de conexión',);
    });
  }
}
