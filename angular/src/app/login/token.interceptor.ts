import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        public loginService: LoginService,
        private router: Router
    ) { }

    // Intercepte toutes les requetes sortantes et rajoute le token JWT pour l'autorisation
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.loginService.getToken()}`
            }
        });

        return next.handle(request).do((event: HttpEvent<any>) => {
            // On ne fait rien si on reçoit une réponse
        }, (err: any) => {
            // Si il y a un code HTTP 401 Unauthorized, alors on renvoie sur la page de login
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    console.error('Interceptor get HTTP 401 :( Redirect to login page');
                    this.router.navigate(['/login']);
                }
            }
        });
    }
}
