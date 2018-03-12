import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-diapo',
  template: `
  <app-title [title]="albumName" [subTitle]="albumLength" [backRoute]="'../'"></app-title>
  <div class="content">
    {{albumName}};{{photoName}}
  </div>
`,
  styleUrls: ['./diapo.component.css']
})
export class DiapoComponent implements OnInit {

  albumName: string;
  photoName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('--------- Create DiapoComponent');
  }

  ngOnInit() {
    console.log('----- Init DiapoComponent');
    this.albumName = this.route.snapshot.params['albumName'];
    this.photoName = this.route.snapshot.params['photoName'];
  }

}
