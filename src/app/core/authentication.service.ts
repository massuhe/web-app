import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap, tap, skipWhile } from 'rxjs/operators';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { ILoginResponse } from './_interfaces/ILoginResponse';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as localforage from 'localforage';

@Injectable()
export class AuthenticationService {
  isLoggedIn: boolean;
  private email: string;
  private nombre: string;
  private permisos: string[];

  private authSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {}


  init() {
    const data = {
      isLoggedIn: this.isLoggedIn,
      email: this.email,
      nombre: this.nombre,
      permisos: this.permisos
    };
    this.isLoggedIn = undefined;
    this.authSubject = new BehaviorSubject<any>(data);
    this.checkLogged();
  }

  checkLogged() {
    localforage.getItem('token').then((token: string) => {
      this.isLoggedIn = false;
      if (token && tokenNotExpired(null, token)) {
        this.isLoggedIn = true;
        this.decodeJWT(token);
      }
      this.emitData();
    });
  }

  loginChanges() {
    return this.authSubject.asObservable().pipe(skipWhile(x => x.isLoggedIn === undefined));
  }

  login(email: string, password: string) {
    return this.http
      .post(`${environment.apiBaseUrl}/login`, { email, password })
      .pipe(
        switchMap((response: ILoginResponse) =>
          fromPromise(localforage.setItem('token', response.access_token))
        ),
        tap(token => {
          this.isLoggedIn = true;
          this.decodeJWT(token);
          this.emitData();
        })
      );
  }

  logout() {
    return fromPromise(localforage.removeItem('token').then(_ => {
      this.isLoggedIn = false;
    }));
  }

  userHasPermission(perm: string[]) {
    return perm.reduce((pv, cv) => pv || this.permisos.includes(cv), false);
  }

  private decodeJWT(token: string): void {
    const userData = new JwtHelper().decodeToken(token);
    this.email = userData.email;
    this.nombre = userData.nombre;
    this.permisos = userData.permisos;
  }

  private emitData() {
    const data = {
      isLoggedIn: this.isLoggedIn,
      email: this.email,
      nombre: this.nombre,
      permisos: this.permisos
    };
    this.authSubject.next(data);
  }
}
