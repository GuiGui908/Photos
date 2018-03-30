import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AlbumService} from './album.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-albums',
  template: `
    <app-title [title]="'Les albums'" [backRoute]="'back'"></app-title>
    <div class="content col-xs-12">
      <div *ngIf="albums == null" style="padding-top: 20px;">
        <mat-progress-spinner class="center" diameter="100" mode="indeterminate"></mat-progress-spinner>
      </div>
      <div *ngIf="albums && albums.length === 0">Aucun album !</div>
      <div *ngFor="let alb of albums" class="albumButton">
        <a [routerLink]="[alb]" mat-raised-button color="primary" (click)="resetPhotoList()">{{alb}}<span class="badge">??</span></a>
        <a [hidden]="true" (click)="compressAlbum(alb)">Comprimer {{alb}}</a>
      </div>
    </div>
  `,
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit, OnDestroy {

  albums: string[];
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) {
    console.log('--------- Create AlbumsComponent');
  }

  ngOnInit() {
    console.log('----- Init AlbumsComponent');
    this.subscription = this.albumService.albumsState.subscribe((albums: string[]) => {
      this.albums = albums;
    });
    this.albumService.findAlbumList();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resetPhotoList() {
    this.albumService.resetPhotoList();
  }

  compressAlbum(albumName: string) {
    this.albumService.compressAlbum(albumName);
  }

}
