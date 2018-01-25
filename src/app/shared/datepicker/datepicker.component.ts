import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild,
  ElementRef, HostListener, Input, forwardRef, NgZone } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class DatepickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() dpName: string;
  @ViewChild('d', { read: ElementRef }) datepickerRef;
  @ViewChild('d') datepicker;
  propagateChange;
  onBlur;
  subscription;
  model;
  disabled: boolean;

  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      this.subscription = fromEvent(document, 'click').subscribe((event: any) => {
        if (event.target.id !== this.dpName) {
          if (this.datepicker.isOpen()) {
            const isDatepickerTarget = this.checkDatepickerTarget(event.target, 5);
            if (!isDatepickerTarget) {
              this.datepicker.close();
              this.zone.run(() => this.onBlur());
            }
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleChange(newDate) {
    const dateFormatted = newDate ? new Date(newDate.year, newDate.month - 1, newDate.day) : null;
    this.propagateChange(dateFormatted);
    this.onBlur();
  }

  writeValue(newDate: Date): void {
    if (newDate) {
      this.model = {
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
        day: newDate.getDate()
      };
    } else {
      this.model = null;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private checkDatepickerTarget(datepickerRef: any, maxIterations: number): boolean {
    const isTarget = false;
    const iterations = 0;
    let ref = datepickerRef;
    while (iterations < maxIterations) {
      if (!ref) {
        return false;
      }
      if (ref.nodeName === 'NGB-DATEPICKER') {
        return true;
      }
      ref = ref.parentNode;
    }
    return isTarget;
  }

}
