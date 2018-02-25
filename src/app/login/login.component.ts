import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
  <div class="row">
    <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-lg-4 col-lg-offset-4">
      <form class="login" [formGroup]="form" (ngSubmit)="onSubmit()">
        <h1>Mon album photo en ligne !</h1>
        <mat-form-field>
          <input type="password" matInput placeholder="Mot de passe" formControlName="password" />
          <mat-error *ngIf="password.hasError('required')">
            Password is <strong>required</strong>
          </mat-error>
        </mat-form-field>
        <div>
          <button type="submit" class="submitButton" mat-raised-button color="primary">Connection</button>
        </div>
      </form>
    </div>
  </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  password: FormControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.password = new FormControl('', Validators.required);
    this.form = this.fb.group({
      password: this.password
    });
  }

  onSubmit() {
    console.log('soumet ', this.form.controls['password'].value);
  }
}
