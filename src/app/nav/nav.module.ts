import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { NavComponent } from './nav/nav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';
import { NavbarItemDropdownComponent } from './navbar-item-dropdown/navbar-item-dropdown.component';
import { ItemDropdownComponent } from './item-dropdown/item-dropdown.component';

import { HomeModule } from '../home/home.module';
import { HomeComponent } from '../home/home/home.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { AuthenticationService } from '../core/authentication.service';
import { SharedModule } from '../shared/shared.module';
import { SesionComponent } from './sesion/sesion.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';

@NgModule({
  imports: [
    RouterModule,
    NgbModule.forRoot(),
    CommonModule,
    SharedModule
  ],
  declarations: [
    NavComponent,
    NavbarComponent,
    NavbarItemComponent,
    NavbarItemDropdownComponent,
    ItemDropdownComponent,
    LoginButtonComponent,
    SesionComponent,
    LogoutButtonComponent
  ],
  providers: [AuthenticationService],
  exports: [NavComponent]
})
export class NavModule { }
