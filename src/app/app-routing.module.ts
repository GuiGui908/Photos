import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DiapoComponent } from './albums/diapo/diapo.component';
import { LoginComponent } from './login/login.component';
import { AlbumComponent } from './albums/album/album.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './login/auth.guard';
import { AutrePageComponent } from './autre-page/autre-page.component';
import { AlbumsComponent } from './albums/albums.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', canActivate: [AuthGuard], component: HomeComponent, children: [
      {
        path: 'albums', children: [
          { path: 'back', redirectTo: '/home' },
          {
            path: ':albumName', children: [
              { path: 'back', redirectTo: '/home/albums' },
              { path: ':photoName', canActivate: [AuthGuard], component: DiapoComponent },
              { path: '', canActivate: [AuthGuard], component: AlbumComponent },
            ]
          },
          { path: '', canActivate: [AuthGuard], component: AlbumsComponent },
        ]
      },
      { path: 'autre', canActivate: [AuthGuard], component: AutrePageComponent },
    ]
  },
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
