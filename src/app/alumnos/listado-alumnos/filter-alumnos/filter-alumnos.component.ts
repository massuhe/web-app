import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { FilterMode } from '../../_constants/FilterMode';

@Component({
  selector: 'app-filter-alumnos',
  templateUrl: './filter-alumnos.component.html',
  styleUrls: ['./filter-alumnos.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FilterAlumnosComponent implements OnInit {

  @Input() filterMode: number;
  @Output() onFilterChange = new EventEmitter<number>();
  filtersMode: any;

  constructor() { }

  ngOnInit() {
    this.filtersMode = FilterMode;
  }

  changeFilter(filterMode: number) {
    this.onFilterChange.emit(filterMode);
  }

}
