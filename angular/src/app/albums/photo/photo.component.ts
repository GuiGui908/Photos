import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SIZE } from '../album.service';

@Component({
  selector: 'app-photo',
  template: `
    <img [hidden]="loading" class="image" [src]="(photoName | photo :albumName :size) | async" (load)="photoIsLoaded()" />
    <mat-progress-spinner *ngIf="loading" class="image center" [diameter]="spinnerDiameter" mode="indeterminate"></mat-progress-spinner>
  `,
  styles: [`
    .image {
      cursor: pointer;
    }
  `]
})
export class PhotoComponent implements OnInit {

  @Input() photoName: string;
  @Input() albumName: string;
  @Input() size: SIZE;
  spinnerDiameter: number;
  loading = true;

  constructor() {
    console.log('--------- Create PhotoComponent');
  }

  ngOnInit() {
    console.log('----- Init PhotoComponent');
    switch (this.size) {
      case SIZE.MIN:
        this.spinnerDiameter = 50; break;
      case SIZE.MAX:
        this.spinnerDiameter = 100; break;
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
