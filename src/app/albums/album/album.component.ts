import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album',
  template: `
    <app-title [title]="albumName" [subTitle]="albumLength" [backRoute]="'back'"></app-title>
    <div class="content">
      <div *ngFor="let photo of photos" class="photoMin">
        <mat-progress-spinner [routerLink]="[photo]" class="spinner" diameter="50" mode="indeterminate"></mat-progress-spinner>
        <span>{{photo}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  albumName: string;
  albumLength: string;
  photos: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService) {
    console.log('--------- Create AlbumComponent');
  }

  ngOnInit() {
    console.log('----- Init AlbumComponent');
    this.albumName = this.route.snapshot.paramMap.get('albumName');
    this.albumLength = '?? photos';
    this.albumService.findPhotoList(this.albumName).subscribe((photos: string[]) => {
      this.photos = photos;
    });
  }

}
