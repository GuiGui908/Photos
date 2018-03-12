import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="topMenu">
      home works!
      <a [routerLink]="['albums']">Albums</a>
      <a [routerLink]="['autre']">Autre</a>
      <a href="#" (click)="logout()">Logout</a>
    </div>
    <div class="content col-lg-8 col-lg-offset-2">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .topMenu {
      width: 100%;
      border-bottom: 10px;
      position: fixed;
      z-index: 1;
      background-color: white;
    }
    .content {
      margin-top: 21px;
    }
    `]
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService) {
    console.log('--------- Create HomeComponent');
  }

  ngOnInit() {
    console.log('----- Init HomeComponent');
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

}
