import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DiapoComponent } from './home/diapo/diapo.component';
import { LoginComponent } from './login/login.component';
import { AlbumComponent } from './home/album/album.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PhotoComponent } from './home/photo/photo.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'album/:albumName', component: AlbumComponent, children: [
      { path: 'diapo', component: DiapoComponent }
    ]
  },
  { path: 'storage/:pathToFile', component: PhotoComponent },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
