import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SIZE } from '../album.service';

@Component({
  selector: 'app-diapo',
  template: `
  <app-title [title]="albumName" [subTitle]="photoName" [backRoute]="'../'"></app-title>
  <div class="content">
    <app-photo (click)="download()" [albumName]="albumName" [photoName]="photoName" [size]="sizeMax"></app-photo>
  </div>
`,
  styleUrls: ['./diapo.component.css']
})
export class DiapoComponent implements OnInit {

  albumName: string;
  photoName: string;
  sizeMax = SIZE.MAX;

  constructor(
    private route: ActivatedRoute
  ) {
    console.log('--------- Create DiapoComponent');
  }

  ngOnInit() {
    console.log('----- Init DiapoComponent');
    this.albumName = this.route.snapshot.params['albumName'];
    this.photoName = this.route.snapshot.params['photoName'];
  }

  download() {
    alert('On pourra bientot télécharger l\'original en cliquant ici');
  }

}
