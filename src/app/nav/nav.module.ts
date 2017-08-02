import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavComponent } from './nav/nav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';
import { NavbarItemDropdownComponent } from './navbar-item-dropdown/navbar-item-dropdown.component';
import { ItemDropdownComponent } from './item-dropdown/item-dropdown.component';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule
  ],
  declarations: [
    NavComponent,
    NavbarComponent,
    NavbarItemComponent,
    NavbarItemDropdownComponent,
    ItemDropdownComponent
  ],
  exports: [NavComponent]
})
export class NavModule { }
