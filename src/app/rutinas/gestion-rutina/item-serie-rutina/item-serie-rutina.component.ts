import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ItemSerie } from '../../_models/ItemSerie';
import { ParametroSemana } from '../../_models/ParametroSemana';
import { ParametroItemSerie } from '../../_models/ParametroItemSerie';
import * as isEqual from 'date-fns/is_equal';

@Component({
  selector: 'app-item-serie-rutina',
  templateUrl: './item-serie-rutina.component.html',
  styleUrls: ['./item-serie-rutina.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemSerieRutinaComponent implements OnInit {
  @Input() item: ItemSerie;
  @Input() set semana(sem: number) {
    this.parametroSemana =
      this.item &&
      this.item.parametrosSemana.find(p => p.semana === sem);
  }
  @Input() set fecha(f: Date) {
    this.parametroItemSerie =
      this.parametroSemana &&
      this.parametroSemana.parametros.find(p =>
        isEqual(p.clase.fechaClaseFija, f)
      );
  }
  toggled: boolean;
  parametroSemana: ParametroSemana;
  parametroItemSerie: ParametroItemSerie;

  constructor() {}

  ngOnInit() {}

  toggleInfo() {
    this.toggled = !this.toggled;
  }
}
