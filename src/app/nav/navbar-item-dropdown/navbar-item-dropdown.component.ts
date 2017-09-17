import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-item-dropdown',
  templateUrl: './navbar-item-dropdown.component.html',
  styleUrls: ['./navbar-item-dropdown.component.scss',
              '../../../assets/scss/layout/_navbar.scss'
  ]
})
export class NavbarItemDropdownComponent implements OnInit {

  @Input() itemId: number;
  @Input() nombre: string;

  constructor(private router: Router) { }

  get isActive() {
    return this.router.url.toUpperCase().includes(this.nombre.toUpperCase()) ? 'active' : '';
  }

  ngOnInit() {
  }

}
