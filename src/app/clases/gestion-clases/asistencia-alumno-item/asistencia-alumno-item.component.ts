import { Component, OnInit, ViewEncapsulation, Input, HostBinding, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-asistencia-alumno-item',
  templateUrl: './asistencia-alumno-item.component.html',
  styleUrls: ['./asistencia-alumno-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsistenciaAlumnoItemComponent implements OnInit {

  @Input() asistente;
  @Output() onDelete = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {

  }

  deleteItem() {
    this.onDelete.emit();
  }

}
