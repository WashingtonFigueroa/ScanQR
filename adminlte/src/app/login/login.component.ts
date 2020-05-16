import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    this.user = new User(1, 'ROLE_USER', '', '', '', '', '', '', '', '', '');
  }

  ngOnInit() {
    this.logout();
  }

  onSubmit(form) {
    this.loginService.signup(this.user).subscribe(response => {
      if (response.status !== 'error') {
          this.token = response;
          // objeto usuario
          this.loginService.signup(this.user, true).subscribe(response2 => {
            this.identity = response2;
            localStorage.setItem('token', this.token);
            localStorage.setItem('identity', JSON.stringify(this.identity));
            this.toastr.success('Bienvenid@!', this.identity.name);
            this.router.navigate(['/']);
          }, error => {
            this.toastr.error('Uppp!', 'Credenciales Incorrectas!');
          });
      } else {
        this.toastr.error('Uppp!', 'Credenciales Incorrectas!');
        form.reset();
      }
    },  error => {
      this.toastr.error('Uppp!', 'Credenciales Incorrectas!');
      form.reset();
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
