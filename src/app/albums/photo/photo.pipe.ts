import { Pipe, PipeTransform } from '@angular/core';
import { AlbumService, SIZE } from '../album.service';
import { Observable } from 'rxjs/Observable';

@Pipe({
    name: 'photo',
    pure: true
})
export class PhotoPipe implements PipeTransform {

    constructor(private albumService: AlbumService) { }

    transform(photoName: string, albumName: string, size: SIZE): Observable<string> {
        return this.albumService.findPhoto(photoName, albumName, size);
    }
}
