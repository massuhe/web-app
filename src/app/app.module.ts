import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { NavbarItemComponent } from './nav/navbar-item/navbar-item.component';
import { NavbarItemDropdownComponent } from './nav/navbar-item-dropdown/navbar-item-dropdown.component';
import { ItemDropdownComponent } from './nav/item-dropdown/item-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarItemComponent,
    NavbarItemDropdownComponent,
    ItemDropdownComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
