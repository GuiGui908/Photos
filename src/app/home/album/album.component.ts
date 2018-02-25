import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  template: `
    <p>
      album works!
      <img src="../../../../storage/premierAlbum/min/IMG_0001.JPG" />
      <router-outlet></router-outlet>
    </p>
  `,
  styles: []
})
export class AlbumComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('Affiche album ', this.route.snapshot.paramMap.get('albumName'));
  }

}
