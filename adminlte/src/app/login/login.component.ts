import {Component, OnInit, OnDestroy, Renderer2} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {ToastrService} from 'ngx-toastr';
import {User} from '../models/user';
import {LoginService} from './login.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public token;
  public identity;

  public loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.title = 'Identificate';
    this.user = new User(1, 1, 1, '', '', '', '', '', '', '', '', ''); 
  }

  ngOnInit() {
    this.logout();
  }

  onSubmit(form) {
    this.loginService.login(this.user)
      .subscribe((response: any) => {
       // console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('identity', JSON.stringify(response.identity));
        this.router.navigate(['dashboard']);
        this.toastr.success('Accediendo al sistema', 'Acceso Concedido');
      }, () => {
        this.toastr.error('Credenciales Incorrectas', 'Acceso Denegado');
      });
  }

  logout() {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const logout = +params['sure'];
      if (logout === 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;
        this.router.navigate(['/inicio']);
      }
    });
  }

}
