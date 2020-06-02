import { Component, OnInit, Renderer2, ViewChild, DoCheck } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, DoCheck {
  public sidebarMenuOpened = true;
  @ViewChild('contentWrapper', { static: false }) contentWrapper;
  public identity;
  public token;
  constructor(
    private renderer: Renderer2,
    private loginService: LoginService,
    private router: Router) {
      this.loadUser();
    }

  ngOnInit() {}

  mainSidebarHeight(height) {
  }

  toggleMenuSidebar() {
    console.log('sidebarMenuCollapsed', this.sidebarMenuOpened);
    if (this.sidebarMenuOpened) {
      this.renderer.removeClass(document.body, 'sidebar-open');
      this.renderer.addClass(document.body, 'sidebar-collapse');
      this.sidebarMenuOpened = false;
    } else {
      this.renderer.removeClass(document.body, 'sidebar-collapse');
      this.renderer.addClass(document.body, 'sidebar-open');
      this.sidebarMenuOpened = true;
    }
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    if (!this.token) {
      this.router.navigate(['login']);
    }
  }
}
