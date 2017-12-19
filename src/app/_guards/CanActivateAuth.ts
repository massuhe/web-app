import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';
import { skip, switchMap, skipWhile } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.authService.loginChanges().pipe(
        switchMap(data => {
        if (data.isLoggedIn) {
            if (this.authService.userHasPermission(route.data.roles)) {
                return of(true);
            } else {
                this.router.navigate(['/forbidden']);
            }
        } else {
            this.router.navigate(['/login']);
        }
        return of(false);
    }));
  }
}
