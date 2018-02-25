import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container-fluid">
      <div class="row">MENU</div>
      <router-outlet></router-outlet>
      <div class="row">Footer</div>
    </div>
  `
})
export class AppComponent {
}
