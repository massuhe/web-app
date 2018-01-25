import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  HostListener,
  OnChanges,
  ElementRef
} from '@angular/core';
import * as startOfWeek from 'date-fns/start_of_week';
import * as endOfWeek from 'date-fns/end_of_week';
import * as addWeeks from 'date-fns/add_weeks';
import * as format from 'date-fns/format';
import * as compareAsc from 'date-fns/compare_asc';

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.scss']
})
export class WeekSelectorComponent implements OnInit, OnChanges {
  @Input() week: Date;
  @Output() onWeekChange = new EventEmitter<Date>();
  model;
  maxDate;
  disableAddWeek;
  @ViewChild('d', { read: ElementRef }) datepickerRef;
  @ViewChild('d') datepicker;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (event.target.name !== 'dp') {
      if (this.datepicker.isOpen()) {
        const el = this.datepickerRef.nativeElement.nextSibling;
        if (
          !this.isInside(
            event.pageX,
            event.pageY,
            el.offsetHeight,
            el.offsetWidth,
            el.offsetTop,
            el.offsetLeft
          )
        ) {
          this.datepicker.close();
        }
      }
    }
  }

  private isInside(mouseX, mouseY, elHeight, elWidth, elTop, elLeft) {
    return (
      mouseX >= elLeft &&
      mouseX <= elLeft + elWidth &&
      (mouseY >= elTop && mouseY <= elTop + elHeight)
    );
  }

  constructor() {}

  ngOnInit() {
    this.maxDate = this.toNgbFormat(
      addWeeks(endOfWeek(new Date(), { weekStartsOn: 6 }), 1)
    );
    this.coso();
  }

  ngOnChanges() {
    this.coso();
  }

  handleArrowNavigation(value: number) {
    const weekEmit = addWeeks(
      startOfWeek(this.week, { weekStartsOn: 1 }),
      value
    );
    this.onWeekChange.emit(weekEmit);
  }

  handleCalendarNavigation(val) {
    const weekEmit = startOfWeek(this.ngbToFormat(val), { weekStartsOn: 1 });
    this.onWeekChange.emit(weekEmit);
  }

  private coso() {
    this.model = this.toNgbFormat(this.week);
    this.disableAddWeek =
      compareAsc(
        this.week,
        addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), 1)
      ) !== 0;
  }

  private ngbToFormat(dateObj) {
    return new Date(dateObj.year, dateObj.month - 1, dateObj.day);
  }

  private toNgbFormat(date: Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }
}
