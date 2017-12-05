import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { Clase } from '../../models/clase';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Asistente } from '../../interfaces/asistente';
import { Alumno } from '../../../alumnos/models/alumno';

@Component({
  selector: 'app-gestion-clase-body',
  templateUrl: './gestion-clase-body.component.html',
  styleUrls: ['./gestion-clase-body.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class GestionClaseBodyComponent implements OnInit {
  @Input() clase: Clase;
  @Input() deshabilitarAgregar: boolean;
  @Output() onChangeAsistencia = new EventEmitter<number>();
  @Output() onRemoveItem = new EventEmitter<number>();
  @Output() onChangeSuspendida = new EventEmitter<boolean>();
  @Output() onChangeMotivo = new EventEmitter<string>();
  @Output() onAddAsistente = new EventEmitter<Asistente>();

  constructor() {}

  ngOnInit() {}

  changeAsistencia(idAsistente: number) {
    this.onChangeAsistencia.emit(idAsistente);
  }

  changeSuspendida(event: Event) {
    const suspendida = (<HTMLInputElement>event.target).checked;
    this.onChangeSuspendida.emit(suspendida);
  }

  changeMotivo(event: FocusEvent) {
    const motivo = (<HTMLInputElement>event.target).value;
    this.onChangeMotivo.emit(motivo);
  }

  removeItem(idAsistente: number) {
    this.onRemoveItem.emit(idAsistente);
  }

  addAlumno(alumno: Alumno) {
    const asistente: Asistente = {
      id: alumno.id,
      nombre: `${alumno.nombre} ${alumno.apellido}`,
      asistio: true
    };
    this.onAddAsistente.emit(asistente);
  }
}
