import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CanActivateLoginGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate() {
    return this.authService.loginChanges().pipe(
        switchMap(data => {
        if (data.isLoggedIn) {
            this.router.navigate(['/home']);
            return of(false);
        }
        return of(true);
        })
    );
  }
}
