import { Component, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Dia } from '../../_models/Dia';
import { flatten } from '../../../shared/_utils/flatten';
import { Clase } from '../../../clases/models/clase';

@Component({
  selector: 'app-gestion-dia-rutina',
  templateUrl: './gestion-dia-rutina.component.html',
  styleUrls: ['./gestion-dia-rutina.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionDiaRutinaComponent implements OnChanges {

  @Input() dia: Dia;
  @Input() semana: number;
  @Input() numeroDia: number;
  @Input() showCargarDetalles: boolean;
  clasesArray: Clase[];
  indexDateSelected: number;
  dateArray: Date[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setClasesArray();
  }

  changeIndiceFecha(amount: number): void {
    this.indexDateSelected = this.indexDateSelected + amount;
  }

  /**
   * Busca todas las fechas distintas existentes en la semana seleccionada.
   * @param semana
   */
  private setClasesArray(): void {
    const clasesArray = [];
    this.dia.series.forEach(s =>
      s.items.forEach(i =>
        i.parametrosSemana.filter(ps => ps.semana === this.semana).forEach(ps =>
          ps.parametros.forEach(p => {
            if (!clasesArray.some(c => c.id === p.clase.id)) {
              clasesArray.push(p.clase);
            }
          })
        )
      )
    );
    this.clasesArray = clasesArray;
    this.dateArray = clasesArray.map(c => c.fechaClaseFija);
    this.indexDateSelected = clasesArray.length - 1;
  }
}
