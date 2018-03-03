import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SearchButtonComponent implements OnInit {

  @Input() typeButton: string;

  constructor() { }

  ngOnInit() {
  }

}
