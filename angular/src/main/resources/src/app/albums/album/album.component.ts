import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlbumService, SIZE} from '../album.service';


@Component({
  selector: 'app-album',
  template: `
    <app-title [title]="albumName" [subTitle]="subTitle" [dlLink]="dlLink" (back)="back()"></app-title>
    <div class="content" [hidden]="modeDiaporama">
      <div *ngIf="photos == null">
        <mat-progress-spinner class="center" diameter="100" mode="indeterminate"></mat-progress-spinner>
      </div>
      <div *ngIf="photos && photos.length === 0">Aucune photo !</div>
      <div *ngFor="let photo of photos; let i = index" class="photoMin">
        <app-photo (click)="showDiapo(i)" [albumName]="albumName" [photoName]="photo" [size]="sizeMin"></app-photo>
        <div class="legend">{{photo}}</div>
      </div>
    </div>
    <div class="content flex" *ngIf="modeDiaporama">
      <input #focusElem [hidden]="false" (blur)="focusInput()" style="top: 0; position: fixed;"
             (keydown.ArrowLeft)="diapoPrev()" (keydown.ArrowRight)="diapoNext()" />
      <div class="previous">
        <img src="assets/ic_keyboard_arrow_left_black_24px.svg" (click)="diapoPrev()">
      </div>
      <div class="photos">
        <app-photo [hidden]="photoShownIdx !== 0" [albumName]="albumName" [photoName]="namePhotoDiapo[0]" [size]="sizeMax"></app-photo>
        <app-photo [hidden]="photoShownIdx !== 1" [albumName]="albumName" [photoName]="namePhotoDiapo[1]" [size]="sizeMax"></app-photo>
        <app-photo [hidden]="photoShownIdx !== 2" [albumName]="albumName" [photoName]="namePhotoDiapo[2]" [size]="sizeMax"></app-photo>
      </div>
      <div class="next">
        <img src="assets/ic_keyboard_arrow_right_black_24px.svg" (click)="diapoNext()">
      </div>
    </div>
  `,
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  subTitle;
  sizeMin = SIZE.MIN;
  sizeMax = SIZE.MAX;

  // Affichage du Diaporama (une grande photo) ou de l'album (la liste des photos)
  modeDiaporama = false;

  // Variables utilisées pour le mode album
  albumName: string;
  albumLength = 0;
  photos: string[];

  // Variables utilisées pour le mode diaporama. Trois photos sont pré-chargées (une précédente, une affichée et la suivante).
  currentPhotoIndex = -1;       // Index dans la photo affichée en grand dans la liste "photos"
  photoShownIdx: number;        // numéro de la photo à afficher parmi les trois. Vaut 0 ou 1 ou 2
  namePhotoDiapo: string[] = [null, null, null];     // Noms des photos
  dlLink: any[];                // Tableau contenant les infos pour télécharger la photo originale : albumName, photoName et size.
  @ViewChild('focusElem') focusElem: ElementRef;

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
        this.subTitle = this.albumLength + ' photos';
      }
    });
    this.albumService.findPhotoList(this.albumName);
  }

  back() {
    if (!this.modeDiaporama) {
      // Revient à la liste des albums
      this.router.navigate(['back'], {relativeTo: this.route});
    } else {
      // Revient à la liste des photos de l'album
      this.subTitle = this.albumLength + ' photos';
      this.modeDiaporama = false;
      this.dlLink = null;
    }
  }

  showDiapo(photoIndex: number) {
    const photoName = this.photos[photoIndex];
    this.currentPhotoIndex = photoIndex;
    this.subTitle = photoName;
    this.photoShownIdx = 1;
    this.namePhotoDiapo[this.prevIdx()] = this.previousPhotoName();
    this.namePhotoDiapo[this.photoShownIdx] = photoName;
    this.namePhotoDiapo[this.nextIdx()] = this.nextPhotoName();
    this.modeDiaporama = true;
    this.dlLink = [this.albumName, photoName, SIZE.ORIGINAL];
    // Ne marche pas car sur téléphone, ça fait toujours apparaitre le clavier :(
    // this.focusInput();
  }

  prevIdx() {
    if (this.photoShownIdx < 0) {
      this.photoShownIdx = this.namePhotoDiapo.length - 1;
    }
    return this.photoShownIdx - 1;
  }
  nextIdx() {
    return (this.photoShownIdx + 1) % this.namePhotoDiapo.length;
  }

  previousPhotoName() {
    let prevIndex = this.currentPhotoIndex;
    if (this.currentPhotoIndex < 0) {
      prevIndex = this.photos.length - 1;
    }
    prevIndex--;
    return this.photos[prevIndex];
  }
  nextPhotoName() {
    const nextIndex = (this.currentPhotoIndex + 1) % this.photos.length;
    return this.photos[nextIndex];
  }

  diapoPrev() {
    this.currentPhotoIndex--;
    this.subTitle = this.photos[this.currentPhotoIndex];
    this.dlLink[1] = this.subTitle;
    this.photoShownIdx = this.prevIdx();
    this.namePhotoDiapo[this.prevIdx()] = this.previousPhotoName();
  }
  diapoNext() {
    this.currentPhotoIndex++;
    this.subTitle = this.photos[this.currentPhotoIndex];
    this.dlLink[1] = this.subTitle;
    this.photoShownIdx = this.nextIdx();
    this.namePhotoDiapo[this.nextIdx()] = this.nextPhotoName();
  }

  focusInput() {
    setTimeout(() => this.focusElem.nativeElement.focus(), 10);
  }
}
