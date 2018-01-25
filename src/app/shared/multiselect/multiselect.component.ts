import { Component, OnInit, ViewEncapsulation, Input, forwardRef } from '@angular/core';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { MULTISELECT_TEXTS, MULTISELECT_SETTINGS } from '../../app-constants';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true
    }
  ]
})
export class MultiselectComponent implements OnInit, ControlValueAccessor {

  @Input() options: IMultiSelectOption[];
  spanishTexts: IMultiSelectTexts;
  settings: IMultiSelectSettings;
  model: number;
  propagateChange: any;
  onBlur: any;

  constructor() { }

  ngOnInit() {
    this.spanishTexts = MULTISELECT_TEXTS;
    this.settings = MULTISELECT_SETTINGS;
  }

  handleChange(value) {
    this.propagateChange(value);
  }

  writeValue(value: number): void {
    if (value) {
      this.model = value;
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

  handleClose() {
    this.onBlur();
  }

}
