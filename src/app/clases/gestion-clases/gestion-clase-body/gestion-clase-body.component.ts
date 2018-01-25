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
import { IAsistente } from '../../interfaces/IAsistente';
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
  @Output() onAddAsistente = new EventEmitter<IAsistente>();

  constructor() {}

  ngOnInit() {}

  changeAsistencia(idAsistente: number): void {
    this.onChangeAsistencia.emit(idAsistente);
  }

  changeSuspendida(event: Event): void {
    const suspendida = (<HTMLInputElement>event.target).checked;
    this.onChangeSuspendida.emit(suspendida);
  }

  changeMotivo(event: FocusEvent): void {
    const motivo = (<HTMLInputElement>event.target).value;
    this.onChangeMotivo.emit(motivo);
  }

  removeItem(idAsistente: number): void {
    this.onRemoveItem.emit(idAsistente);
  }

  addAlumno(alumno: Alumno): void {
    const asistente: IAsistente = {
      id: alumno.id,
      nombre: `${alumno.nombre} ${alumno.apellido}`,
      asistio: true
    };
    this.onAddAsistente.emit(asistente);
  }
}
