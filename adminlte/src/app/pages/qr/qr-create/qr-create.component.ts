import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment.prod';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from 'src/app/login/login.service';
import {Router} from '@angular/router';
import {Qr} from 'src/app/models/qr';
import {QrService} from '../qr.service';

@Component({
  selector: 'app-qr-create',
  templateUrl: './qr-create.component.html',
  styleUrls: ['./qr-create.component.scss']
})
export class QrCreateComponent implements OnInit {
  public title: string;
  public qr: Qr;
  public identity;
  public token;
  public base = environment.servidor;


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private qrService: QrService
  ) {
    this.title = 'Crear Qr';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.qr = new Qr(1, '', '', 1, 'Activo');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.qrService.guardar(this.token, this.qr).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'Qr Registrado');
        form.reset();
        this.router.navigate(['/qr']);
      } else {
        this.toastr.error('Uppp!', response.message);
      }
    }, error => {
      this.toastr.error('Uppp!', 'comuniquese con el Administrador');
    });
  }
}
