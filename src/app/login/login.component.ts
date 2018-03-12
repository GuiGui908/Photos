import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as shajs from 'sha.js';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  template: `
    <div class="row">
      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-lg-4 col-lg-offset-4">
        <form class="pageMessage login" [formGroup]="form" (ngSubmit)="onSubmit()">
          <h1>Mon album photo en ligne !</h1>
          <mat-form-field style="display: none;">
            <input type="text" matInput placeholder="Login" formControlName="username" />
            <mat-error *ngIf="username.hasError('required')">
              <strong>Obligatoire</strong>
            </mat-error>
          </mat-form-field>
          <br/>
          <mat-form-field>
            <input #pwd type="password" matInput placeholder="Mot de passe" formControlName="password" />
            <mat-error *ngIf="password.hasError('required')">
              <strong>Obligatoire</strong>
            </mat-error>
          </mat-form-field>
          <div>
            <button type="submit" [disabled]="logingInProgress" class="submitButton" mat-raised-button color="primary">Connection</button>
          </div>
          <div class="errorMessage">{{errorMessage}}</div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  logingInProgress = false;
  form: FormGroup;
  password: FormControl;
  username: FormControl;

  @ViewChild('pwd') passwordElem: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    console.log('--------- Create LoginComponent');
  }

  ngOnInit() {
    console.log('----- Init LoginComponent');
    this.password = new FormControl('', Validators.required);
    this.username = new FormControl('anonyme', Validators.required);
    this.form = this.fb.group({
      password: this.password,
      username: this.username
    });
    this.passwordElem.nativeElement.focus();
  }

  onSubmit() {
    const login = this.form.controls['username'].value;
    const pwd = this.form.controls['password'].value;
    if (!login || !pwd) {
      return;
    }
    this.logingInProgress = true;
    const shaPwd = shajs('sha1').update(pwd).digest('hex');

    // Demande un Token JWT au back
    this.loginService.authenticate(login, shaPwd).subscribe(() => {
      this.router.navigate(['/home']);
      this.logingInProgress = false;
    }, (error) => {
      console.error('HTTP Error : ', error);
      if (!error || !error.error || error.status !== 401) {
        this.errorMessage = 'Erreur lors de l\'authentification' + (error.status ? ' : Erreur HTTP ' + error.status : '');
      } else {
        this.errorMessage = 'Mauvais mot de passe';
      }
      this.logingInProgress = false;
    });
  }
}
