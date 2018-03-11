import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo',
  template: `
    <img [src]="" [alt]="alt" />
  `,
  styles: []
})
export class PhotoComponent implements OnInit {

  src: string;
  alt: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.src = 'storage/' + this.route.snapshot.paramMap.get('pathToFile');
    this.alt = 'Description de l\'image';
  }

}
