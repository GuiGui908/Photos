import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  template: `
    <p>
      home works!
      <button (click)="navigate('albums')">Albums</button>
      <button (click)="navigate('autre')">Autre</button>
      <button (click)="logout()">Logout</button>
    </p>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(
    private route: Router,
    private loginService: LoginService) { }

  ngOnInit() {
  }

  navigate(route: string) {
    this.route.navigate([`/${route}`]);
  }

  logout() {
    this.loginService.logout();
    this.navigate('login');
  }

}
