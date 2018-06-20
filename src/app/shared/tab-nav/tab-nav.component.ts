import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITab } from './ITab';

@Component({
  selector: 'app-tab-nav',
  templateUrl: './tab-nav.component.html',
  styleUrls: ['./tab-nav.component.scss']
})
export class TabNavComponent implements OnInit {

  @Input() items: ITab[];
  @Input() active: number;
  @Output() onItemClick = new EventEmitter<number>();

  constructor() { }

  handleClick(event, itemId) {
    this.onItemClick.emit(itemId);
  }

  ngOnInit() {
  }

}
