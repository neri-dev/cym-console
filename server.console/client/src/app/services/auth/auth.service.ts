import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from "moment";
import jwt_decode from 'jwt-decode';

const AUTH_API = `${window.location.origin}/auth/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    var obs = this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);

    obs.subscribe(token => {
      this.setSession(token.toString());
      this.router.navigate(['home']);
    });

    return obs;
  }

  private setSession(token: string) {
    const {iat}  = this.decodeToken(token);
    const expiresAt = moment().add(iat, 'second');

    localStorage.setItem('id_token', token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  private decodeToken(token: string): { iat: any; } {
    return jwt_decode(token);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at") ?? '';
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getToken() {
    return localStorage.getItem('token_id');
  }
}

