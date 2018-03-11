import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class AlbumService {

  constructor(private http: HttpClient) { }

  findAlbumList(): any {
    return this.http.get(`${environment.backUrl}/allAlbums`);
  }
}
