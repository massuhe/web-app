import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Output() input = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  handleInput(e) {
    this.input.emit(e.data);
  }

}
