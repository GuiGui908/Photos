import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

    constructor(
        private httpClient: HttpClient
    ) { }

    authenticate(login: string, shaPwd: string): Observable<void> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.httpClient.post<any>(`${environment.backUrl}/login`, {
            username: login,
            sha1Password: shaPwd
        }, httpOptions).map((res) => {
            if (res['Bearer ']) {
                localStorage.setItem('token', res['Bearer ']);
            } else {
                throw new Error('No valid token provided');
            }
        });
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        if (token) {
            // decode the token to verify the signature
            const jwt: any = jwtDecode(token);
            // Check if the token expired
            if ( jwt.exp > Date.now() / 1000) {
                // Great it didn't !!
                return true;
            }
        }
        return false;
    }

    public logout(): void {
        localStorage.removeItem('token');
    }
}
