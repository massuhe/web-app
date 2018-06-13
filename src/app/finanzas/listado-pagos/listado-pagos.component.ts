import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef, Inject, LOCALE_ID } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { DialogService } from '../../core/dialog.service';
import { GENERIC_ERROR_MESSAGE } from '../../app-constants';
import { SpanishMonthPipe } from '../../shared/spanish-month/spanish-month.pipe';
import { DateTimeFormatPipe } from '../../shared/date-time-format/date-time-format.pipe';
import { IFiltroAlumnoFechas } from '../_interfaces/IFiltroAlumnoFechas';
import { IFiltroCuotaMes } from '../_interfaces/IFiltroCuotaMes';
import { PagosService } from '../_services/pagos.service';

@Component({
  selector: 'app-listado-pagos',
  templateUrl: './listado-pagos.component.html',
  // styleUrls: ['./listado-pagos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoPagosComponent implements OnInit {

  @ViewChild('indexTmpl') indexTmpl: TemplateRef<any>;
  rows;
  columns;
  showLoader: boolean;

  constructor(
    private pagosService: PagosService,
    private dialogService: DialogService,
    @Inject(LOCALE_ID) private localeId
  ) {}

  ngOnInit() {
    this.rows = [];
    this.columns = [
      { name: '#', width: 50, cellTemplate: this.indexTmpl },
      { prop: 'apellido' },
      { prop: 'nombre' },
      { prop: 'mes', pipe: new SpanishMonthPipe()},
      { prop: 'anio', name: 'Año', width: 50 },
      { prop: 'importe', pipe: new CurrencyPipe(this.localeId)},
      { prop: 'fechaPago', pipe: new DateTimeFormatPipe(this.localeId)},
      { prop: 'totalCuota', pipe: new CurrencyPipe(this.localeId)}
    ];
    this.showLoader = true;
    const today = new Date();
    let filtroCuotaMes : IFiltroCuotaMes = {
      mes: today.getMonth() + 1,
      anio: today.getFullYear()
    }
    this.pagosService.getPagosByMesCuota(filtroCuotaMes).subscribe(
      pagos => {
        this.rows = pagos;
        this.showLoader = false;
      },
      res => this.handleErrors(res)
    );
  }

  handleSearchCuotaMes(cuotaMes: IFiltroCuotaMes): void {
    this.rows = [];
    this.showLoader = true;
    this.pagosService.getPagosByMesCuota(cuotaMes).subscribe(
      pagos => {
        this.rows = pagos;
        this.showLoader = false;
      },
      res => this.handleErrors(res)
    );
  }

  handleSearchAlumnoFecha(datosAlumnoFechas: IFiltroAlumnoFechas): void {
    this.rows = [];
    this.showLoader = true;
    this.pagosService.getPagosByAlumnoYFechas(datosAlumnoFechas).subscribe(
      pagos => {
        this.rows = pagos;
        this.showLoader = false;
      },
      res => this.handleErrors(res)
    );
  }

  private handleErrors(res) {
    this.showLoader = false;
    this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
  }

}
