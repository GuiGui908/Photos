import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService, SIZE } from '../album.service';


@Component({
  selector: 'app-album',
  template: `
    <app-title [title]="albumName" [subTitle]="albumLength + ' photos'" [backRoute]="'back'"></app-title>
    <div class="content">
      <div *ngIf="photos == null">
        <mat-progress-spinner class="center" diameter="100" mode="indeterminate"></mat-progress-spinner>
      </div>
      <div *ngIf="photos && photos.length === 0">Aucune photo !</div>
      <div *ngFor="let photo of photos" class="photoMin">
        <app-photo [routerLink]="[photo]" [albumName]="albumName" [photoName]="photo" [size]="sizeMin"></app-photo>
        <div>{{photo}}</div>
      </div>
    </div>
  `,
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  albumName: string;
  albumLength = 0;
  photos: string[];
  sizeMin = SIZE.MIN;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService) {
    console.log('--------- Create AlbumComponent');

  }

  ngOnInit() {
    console.log('----- Init AlbumComponent');
    this.albumName = this.route.snapshot.paramMap.get('albumName');
    this.albumService.photosState.subscribe((photos: string[]) => {
      this.photos = photos;
      if (photos) {
        this.albumLength = photos.length;
      }
    });
    this.albumService.findPhotoList(this.albumName);
  }

}
