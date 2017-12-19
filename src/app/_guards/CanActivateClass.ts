import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CanActivateClassGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate() {
    return this.authService.loginChanges().pipe(
        switchMap(_ => {
            if (this.authService.userHasPermission(['VER_LISTADO_CLASES_ESPECIFICAS'])) {
              return of(true);
            }
            if (this.authService.userHasPermission(['VER_LISTADO_CLASES_ESPECIFICAS_ALUMNO'])) {
              this.router.navigate(['clases/alumno']);
              return of(false);
            }
            return of(false);
        }));
  }
}
