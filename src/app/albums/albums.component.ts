import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from './album.service';

@Component({
  selector: 'app-album',
  template: `
    <p>
      albums list
    </p>
    <div *ngFor="let alb of albums">
      <button>{{alb}}</button>
    </div>
  `,
  styles: []
})
export class AlbumsComponent implements OnInit {

  private albums: string[];

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) { }

  ngOnInit() {
    console.log('Affiche la liste des albums ');
    this.albumService.findAlbumList().subscribe((albums: string[]) => {
      this.albums = albums;
    });
  }

}
