import { Directive, ElementRef, Input, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';
import { skip } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[permisos]'
})
export class PermissionDirective implements OnInit, OnDestroy {

  @Input('permisos') permisos: string[];
  loginSubscription;
  previousValue: string;

  constructor(private el: ElementRef, private render: Renderer2, private authService: AuthenticationService) { }

  ngOnInit() {
    this.loginSubscription = this.authService.loginChanges().subscribe(data => {
      const { permisos, email, isLoggedIn } = data;
      this.previousValue = email;
      if (isLoggedIn && this.includesPermisos(permisos)) {
        this.render.setStyle(this.el.nativeElement, 'display', 'initial');
      } else {
        this.render.setStyle(this.el.nativeElement, 'display', 'none');
      }
    });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  includesPermisos(permisosUsuario) {
    return this.permisos.reduce((pv, cv) => pv || permisosUsuario.includes(cv), false);
  }

}
