import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MESES_ANIO } from '../../../app-constants';
import { IFiltroCuotaMes } from '../../_interfaces/IFiltroCuotaMes';

@Component({
  selector: 'app-filtro-pagos-cuota-mes',
  templateUrl: './filtro-pagos-cuota-mes.component.html',
  styleUrls: ['./filtro-pagos-cuota-mes.component.scss']
})
export class FiltroPagosCuotaMesComponent implements OnInit {

  @Output() onSearch = new EventEmitter<IFiltroCuotaMes>();
  meses = MESES_ANIO;
  mesSelected;
  anio;

  constructor() { }

  ngOnInit() {
    const today = new Date();
    this.mesSelected = today.getMonth() + 1;
    this.anio = today.getFullYear();
  }

  handleClick() {
    let filtroCuotaMes : IFiltroCuotaMes = {
      mes: this.mesSelected,
      anio: this.anio
    }
    this.onSearch.emit(filtroCuotaMes);
  }

}
