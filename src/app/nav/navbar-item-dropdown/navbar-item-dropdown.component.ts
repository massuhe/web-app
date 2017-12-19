import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  QueryList,
  AfterContentInit
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ItemDropdownComponent } from '../item-dropdown/item-dropdown.component';

@Component({
  selector: 'app-navbar-item-dropdown',
  templateUrl: './navbar-item-dropdown.component.html',
  styleUrls: [
    './navbar-item-dropdown.component.scss',
    '../../../assets/scss/layout/_navbar.scss'
  ]
})
export class NavbarItemDropdownComponent implements OnInit, AfterContentInit {
  @ContentChildren(ItemDropdownComponent)
  itemDropdowns: QueryList<ItemDropdownComponent>;
  @Input() itemId: number;
  @Input() nombre: string;

  isActive: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActive();
      }
    });
  }

  ngAfterContentInit() {
    this.itemDropdowns.forEach(items => {
      items.itemId = this.itemId;
    });
    this.setActive();
  }

  private setActive() {
    const paths = this.itemDropdowns.map(i => i.path);
    this.isActive = paths.reduce(
      (previous, current) =>
        previous ||
        (this.router.url.substr(1).includes(current) && current !== '/'),
      false
    );
  }
}
