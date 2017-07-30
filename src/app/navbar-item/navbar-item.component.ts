import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss',
              '../../assets/scss/layout/_navbar.scss'
  ]
})
export class NavbarItemComponent implements OnInit {

  @Input() itemId: number;

  constructor() { }

  ngOnInit() {
  }

}
