import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="topMenu">
      <a  mat-raised-button color="accent" [routerLink]="['albums']">Albums</a>
      <a mat-raised-button *ngIf="false" [routerLink]="['autre']">Autre</a>
      <img src="assets/ic_power_settings_new_red_24px.svg" style="float: right; cursor: pointer;"
           (click)="logout()" title="Se déconnecter"/>
    </div>
    <div class="content col-lg-8 col-lg-offset-2">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .topMenu {
      width: 96%;
      border-bottom: 10px;
      position: fixed;
      z-index: 1;
      background-color: white;
    }
    .topMenu a {
      line-height: 20px;
    }
    .content {
      margin-top: 24px;
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
