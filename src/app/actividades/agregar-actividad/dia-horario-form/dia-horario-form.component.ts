import { ViewChild, Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import DiaActividad from '../../models/DiaActividad';
import { AgregarDiaComponent } from '../agregar-dia/agregar-dia.component';
import { DIAS_SEMANA } from '../../constants';

@Component({
  selector: 'app-dia-horario-form',
  templateUrl: './dia-horario-form.component.html',
  styleUrls: ['./dia-horario-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DiaHorarioFormComponent implements OnInit {

  @Input() diasHorarios: DiaActividad[];
  @Output() onChangeDiasHorarios = new EventEmitter<DiaActividad[]>();
  get diasNoDisponibles() {
    return this.diasHorarios.map(d => d.diaSemana);
  }

  constructor() { }

  ngOnInit() { }

  addDia(diaActividad: DiaActividad): void {
    let indexInsertar = 0;
    const diaSemanaNum = DIAS_SEMANA.indexOf(diaActividad.diaSemana);
    this.diasHorarios.forEach((d: DiaActividad, i: number) => {
      const dNum = DIAS_SEMANA.indexOf(d.diaSemana);
      if (diaSemanaNum > dNum) {
        indexInsertar = i + 1;
      }
    });
    const sortedArr = [...this.diasHorarios.slice(0, indexInsertar), diaActividad, ...this.diasHorarios.slice(indexInsertar)];
    this.onChangeDiasHorarios.emit(sortedArr);
  }

  deleteDia(indexDia: number): void {
    const diasDeleted = [...this.diasHorarios.slice(0, indexDia), ...this.diasHorarios.slice(indexDia + 1)];
    this.onChangeDiasHorarios.emit(diasDeleted);
  }

}
