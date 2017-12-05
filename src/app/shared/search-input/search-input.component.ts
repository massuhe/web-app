import { Component, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, map } from 'rxjs/operators';

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
    const keyups = fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      debounceTime(500),
      map((event: KeyboardEvent) => event.srcElement['value'])
    )
      // .debounceTime(500)
      // .map((event: KeyboardEvent) => event.srcElement['value'])
      .subscribe(val => this.inputDebounced.emit(val));
  }


}
