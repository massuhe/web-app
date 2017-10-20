import { Component, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements AfterViewInit {

  @Output() inputDebounced = new EventEmitter<any>();
  @ViewChild('input') input;

  constructor() { }

  ngAfterViewInit() {
    const keyups = Observable
      .fromEvent(this.input.nativeElement, 'keyup')
      .debounceTime(500)
      .map((event: KeyboardEvent) => event.srcElement['value'])
      .subscribe(val => this.inputDebounced.emit(val));
  }


}
