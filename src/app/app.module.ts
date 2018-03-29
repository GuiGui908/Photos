import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DiapoComponent } from './albums/diapo/diapo.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumComponent } from './albums/album/album.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './login/auth.guard';
import { LoginService } from './login/login.service';
import { AlbumService } from './albums/album.service';
import { TokenInterceptor } from './login/token.interceptor';
import { AutrePageComponent } from './autre-page/autre-page.component';
import { TitleComponent } from './albums/title/title.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PhotoPipe } from './albums/photo/photo.pipe';
import { PhotoComponent } from './albums/photo/photo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DiapoComponent,
    AlbumsComponent,
    AlbumComponent,
    NotFoundComponent,
    AutrePageComponent,
    TitleComponent,
    PhotoComponent,
    PhotoPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [AuthGuard, LoginService, AlbumService, PhotoPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
