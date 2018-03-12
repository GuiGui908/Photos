import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AlbumService {

  private albumsSubject = new BehaviorSubject<string[]>([]);
  albumsState = this.albumsSubject.asObservable();

  constructor(private http: HttpClient) { }

  findAlbumList(): void {
    this.http
      .get<string[]>(`${environment.backUrl}/allAlbums`)
      .subscribe((albums: string[]) => {
        this.albumsSubject.next(albums);
      });
  }

  findPhotoList(albumName: string): Observable<string[]> {
    return this.http.get<string[]>(`${environment.backUrl}/album/${albumName}`);
  }
}
