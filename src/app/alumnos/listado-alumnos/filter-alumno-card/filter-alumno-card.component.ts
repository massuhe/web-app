import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-filter-alumno-card',
  templateUrl: './filter-alumno-card.component.html',
  styleUrls: ['./filter-alumno-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FilterAlumnoCardComponent implements OnInit {

  @Input() descripcion: string;
  @Input() active: boolean;

  constructor() { }

  ngOnInit() {
  }

}
