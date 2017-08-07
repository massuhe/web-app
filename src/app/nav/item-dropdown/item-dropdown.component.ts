import { Component, OnInit, Input } from '@angular/core';
import { NavbarItemDropdownComponent } from '../navbar-item-dropdown/navbar-item-dropdown.component';

@Component({
  selector: 'app-item-dropdown',
  templateUrl: './item-dropdown.component.html',
  styleUrls: ['./item-dropdown.component.scss']
})
export class ItemDropdownComponent implements OnInit {

  itemId: number;

  constructor(private parent: NavbarItemDropdownComponent) { }

  ngOnInit() {
    this.itemId = this.parent.itemId;
  }

}
