import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Dia } from '../../_models/Dia';
import { flatten } from '../../../shared/_utils/flatten';

@Component({
  selector: 'app-gestion-dia-rutina',
  templateUrl: './gestion-dia-rutina.component.html',
  styleUrls: ['./gestion-dia-rutina.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionDiaRutinaComponent implements OnInit {
  @Input() dia: Dia;
  @Input()
  set semana(sem: number) {
    this._semana = sem;
    this.setDateArray(sem);
  }
  _semana: number;
  dateArray: Date[];
  indexDateSelected: number;

  constructor() {}

  ngOnInit() {}

  changeIndiceFecha(amount: number): void {
    this.indexDateSelected = this.indexDateSelected + amount;
  }

  /**
   * Busca todas las fechas distintas existentes en la semana seleccionada.
   * @param semana
   */
  private setDateArray(semana: number): void {
    const dateArray = [];
    this.dia.series.forEach(s =>
      s.items.forEach(i =>
        i.parametrosSemana.filter(ps => ps.semana === semana).forEach(ps =>
          ps.parametros.forEach(p => {
            if (!dateArray.includes(p.clase.id)) {
              dateArray.push(p.clase.fechaClaseFija);
            }
          })
        )
      )
    );
    this.dateArray = dateArray;
    this.indexDateSelected = 0;
  }
}
