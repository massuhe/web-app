import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '../../core/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit, OnDestroy {

  subscription;
  isLogged: boolean;
  usuario: string;

  constructor(private authService: AuthenticationService, private ref: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.subscription = this.authService.loginChanges().subscribe(userdata => {
      this.isLogged = userdata.isLoggedIn;
      this.usuario = userdata.nombre;
    });
  }

  handleLogout() {
    this.authService.logout().subscribe(_ => {
      window.location.href = '/';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
