import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LogoutButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
