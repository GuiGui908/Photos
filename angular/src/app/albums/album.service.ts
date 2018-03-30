import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';

export enum SIZE {
  MAX = 'MAX',
  MIN = 'MIN',
  ORIGINAL = 'ORIGINAL'
}

@Injectable()
export class AlbumService {


  private albumsSubject = new BehaviorSubject<string[]>(null);
  albumsState = this.albumsSubject.asObservable();

  private photosSubject = new BehaviorSubject<string[]>(null);
  photosState = this.photosSubject.asObservable();

  private currentPhotoSubject = new BehaviorSubject<Blob>(null);
  currentPhotoState = this.currentPhotoSubject.asObservable();

  constructor(private http: HttpClient) { }

  findAlbumList(): void {
    this.http
      .get<string[]>(`${environment.backUrl}/allAlbums`)
      .subscribe((albums: string[]) => {
        this.albumsSubject.next(albums);
      });
  }

  findPhotoList(albumName: string): void {
    this.http
      .get<string[]>(`${environment.backUrl}/album/${albumName}`)
      .subscribe((photos: string[]) => {
        this.photosSubject.next(photos);
      });
  }

  compressAlbum(albumName: string): void {
    this.http
      .get<string[]>(`${environment.backUrl}/album/compress/${albumName}`)
      .subscribe(() => alert('L\'album ' + albumName + ' a ete compresse.'));
  }

  resetPhotoList(): void {
    this.photosSubject.next(null);
  }

  findPhoto(photoName: string, albumName: string, size: SIZE): Observable<any> {
    const httpOptions = {
      responseType: 'blob' as 'blob'
    };

    return this.http
      .get(`${environment.backUrl}/album/${albumName}/photo/${photoName}/${size}`, httpOptions)
      .switchMap((photo: Blob) => {
        // return new observable which emits a base64 string when blob is converted to base64
        return Observable.create(observer => {
          const reader = new FileReader();
          // emit the base64 string when finished
          reader.addEventListener(
            'load',
            () => observer.next(reader.result),
            false);
          // start the convertion from blob to base64
          reader.readAsDataURL(photo);
        });
      })
      .catch((err: HttpErrorResponse) => {
        console.error('An error occured when findPhoto : ', err.message);
        // Affiche la photo d'erreur
        return Observable.create(observer => observer.next('assets/ic_error_red_50px.svg'));
      });
  }
}
