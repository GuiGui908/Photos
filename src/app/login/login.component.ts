import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
  <div style="text-align:center">
    <h1>
      Welcome to {{ title }}!
    </h1>
    
  </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
