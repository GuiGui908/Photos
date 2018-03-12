import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from './album.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-albums',
  template: `
    <app-title [title]="'Les albums'" [backRoute]="'back'"></app-title>
    <div class="content">
      <div *ngFor="let alb of albums" class="albumButton">
        <a [routerLink]="[alb]" mat-raised-button color="primary">{{alb}}<span class="badge">??</span></a>
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
    this.albumService.findAlbumList();
    this.subscription = this.albumService.albumsState.subscribe((albums: string[]) => {
      console.log('subjet : new albumList');
      this.albums = albums;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
