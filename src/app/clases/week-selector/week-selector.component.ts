import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as startOfWeek from 'date-fns/start_of_week';
import * as addWeeks from 'date-fns/add_weeks';
import * as format from 'date-fns/format';

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.scss']
})
export class WeekSelectorComponent implements OnInit {

  @Input() week: Date;
  @Output() onWeekChange = new EventEmitter<Date>();
  weeksToAdd;

  constructor() { }

  ngOnInit() {
    this.weeksToAdd = 0;
  }

  changeWeeksToAdd(value: number) {
    this.weeksToAdd += value;
    const weekEmit = addWeeks(startOfWeek(new Date(), {weekStartsOn: 1}), this.weeksToAdd);
    this.onWeekChange.emit(weekEmit);
  }

}
