import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h2>Menu</h2>
  <router-outlet></router-outlet>
  `,
  styleUrls: []
})
export class AppComponent {
  title = 'Photos';
}
