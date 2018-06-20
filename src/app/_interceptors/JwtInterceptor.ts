import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as localforage from 'localforage';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router, private inj: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return fromPromise(localforage.getItem('token')).pipe(
      switchMap(token => {
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(authReq).pipe(map(this.handleResponse.bind(this)));
      }),
      catchError(err => {
        this.handleError(err);
        return ErrorObservable.create(err);
      })
    );
  }

  private handleResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      this.setToken(event.headers);
    }
    return event;
  }

  private handleError(err) {
    switch (err.status) {
      case 401:
        const auth = this.inj.get(AuthenticationService);
        auth.logout().subscribe(_ => this.router.navigate(['/login']));
        break;
      case 403:
      case 404:
      case 422:
        this.setToken(err.headers);
    }
  }

  private setToken(headers: HttpHeaders): void {
    const newToken = headers.get('Authorization');
    if (newToken) {
      localforage.setItem('token', newToken.substr(7));
    }
  }
}
