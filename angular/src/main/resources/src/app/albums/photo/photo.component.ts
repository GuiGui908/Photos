import { Component, OnInit, Input } from '@angular/core';
import { SIZE } from '../album.service';

@Component({
  selector: 'app-photo',
  template: `
    <img [hidden]="loading" class="image" [src]="(photoName | photo :albumName :size) | async" (load)="photoIsLoaded()"
          [style.max-width.px]="maxwidth" [style.max-height.px]="maxheight" />
    <mat-progress-spinner *ngIf="loading" class="image center" [diameter]="spinnerDiameter" mode="indeterminate"></mat-progress-spinner>
  `,
  styles: [`
    .image {
      cursor: pointer;
      margin: 0 auto;
      display: block;
    }
  `]
})
export class PhotoComponent implements OnInit {

  @Input() photoName: string;
  @Input() albumName: string;
  @Input() size: SIZE;
  spinnerDiameter: number;
  loading = true;
  maxwidth: number;
  maxheight: number;


  constructor() {
    console.log('--------- Create PhotoComponent');
  }

  ngOnInit() {
    console.log('----- Init PhotoComponent');
    switch (this.size) {
      case SIZE.MIN:
        this.spinnerDiameter = 50; break;
      case SIZE.MAX:
        this.spinnerDiameter = 100;
        this.maxwidth = window.innerWidth - 20;
        this.maxheight = window.innerHeight - 100;
        break;
      case SIZE.ORIGINAL:
        this.spinnerDiameter = 150; break;
      default:
        this.spinnerDiameter = 50; break;
    }
  }

  photoIsLoaded() {
    this.loading = !this.loading;
  }

}
