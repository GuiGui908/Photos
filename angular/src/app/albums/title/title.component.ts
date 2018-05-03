import {AlbumService, SIZE} from '../album.service';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-title',
  template: `
    <div class="title col-lg-8 col-sm-11 col-xs-12">
      <i class="material-icons back" (click)="clickBack()">arrow_back</i>
      <h1>{{title}}</h1>
      <span class="badge badge-secondary">{{subTitle}}</span>
      <img *ngIf="dlLink && !downloading" src="assets/ic_file_download_black_24px.svg" (click)="donwload()" title="Télécharger"/>
      <mat-progress-spinner *ngIf="downloading" [diameter]="25" mode="indeterminate"></mat-progress-spinner>
    </div>
  `,
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() dlLink: any[];
  @Output() back = new EventEmitter();
  downloading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService) {
    console.log('--------- Create TitleComponent');
  }

  ngOnInit() {
    console.log('----- Init TitleComponent');
  }

  clickBack() {
    this.back.emit();
  }

  donwload() {
    const album: string = this.dlLink[0];
    const photo: string = this.dlLink[1];
    const size: SIZE = this.dlLink[2];
    this.downloading = true;
    this.albumService.findPhoto(album, photo, size).subscribe(data => this.downloadFile(data), // console.log(data),
      error => console.log('Error downloading the file.'),
      () => console.log('OK'));
  }

  downloadFile(data: string) {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = data;
    a.download = this.dlLink[1];
    a.click();
    window.URL.revokeObjectURL(data);
    a.remove(); // remove the element
    this.downloading = false;
  }
}
