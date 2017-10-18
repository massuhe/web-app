import { Component, OnInit, Input, QueryList, ContentChildren, ElementRef } from '@angular/core';
import { SchedulerCellComponent } from '../scheduler-cell/scheduler-cell.component';
import * as compareAsc from 'date-fns/compare_asc';

@Component({
  selector: 'app-scheduler-column',
  templateUrl: './scheduler-column.component.html',
  styleUrls: ['./scheduler-column.component.scss']
})
export class SchedulerColumnComponent implements OnInit {

  showContent: boolean;
  @Input('date') date;
  @Input('smallScreen') smallScreen;
  @ContentChildren(SchedulerCellComponent, {read: ElementRef}) cells: QueryList<ElementRef>;

  constructor() { }

  ngOnInit() {
    const today = new Date();
    const dateFormatted = new Date(this.date);
    const isToday = today.getDay() === dateFormatted.getDay()
        && today.getFullYear() === dateFormatted.getFullYear()
        && today.getMonth() === dateFormatted.getMonth();
    this.showContent = isToday;

   }

  toggle() {
    if (this.smallScreen) {
      this.showContent = !this.showContent;
    }
  }

  get shouldShow(): boolean {
    return (!this.smallScreen) || (this.smallScreen && this.showContent);
  }

}
