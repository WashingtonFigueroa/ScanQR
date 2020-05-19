import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/utils/services/app.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  public searchForm: FormGroup;
  public token;
  public identity;

  constructor(
    private appService: AppService,
    private router: Router,
    private loginService: LoginService
    ) {
      this.identity = this.loginService.getIdentity();
    }

    ngOnInit() {
      this.searchForm = new FormGroup({
        search: new FormControl(null)
      });
    }

  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    this.identity = null;
    this.token = null;
    this.router.navigate(['/login']);
  }
}
