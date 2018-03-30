import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autre-page',
  template: `
    <p>
      autre-page works!
    </p>
  `,
  styles: []
})
export class AutrePageComponent implements OnInit {

  constructor() {
    console.log('--------- Create AutrePageComponent');
  }

  ngOnInit() {
    console.log('----- Init AutrePageComponent');
  }

}
