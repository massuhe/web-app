import { Component, OnInit, ViewEncapsulation, Input, ViewChild, TemplateRef } from '@angular/core';
import { Movimiento } from '../../_models/Movimiento';
import { Cuota } from '../../_models/Cuota';
import * as startOfMonth from 'date-fns/start_of_month';
import * as addDays from 'date-fns/add_days';
import * as compareAsc from 'date-fns/compare_asc';
import * as format from 'date-fns/format';
import * as lastDayOfMonth from 'date-fns/last_day_of_month';
import { TipoMovimiento } from '../../_models/TipoMovimiento';

@Component({
  selector: 'app-flujo-caja',
  templateUrl: './flujo-caja.component.html',
  styleUrls: ['./flujo-caja.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlujoCajaComponent implements OnInit {

  @Input() set movimientos(val: Movimiento[]) {
    this._movimientos = val;
    this.rows = this.calcularCaja();
  }
  @Input() set cuotas(val: Cuota[]) {
    this._cuotas = val;
    this.rows = this.calcularCaja();
  }
  @Input() currentDate: Date;
  @ViewChild('currencyTmpl') currencyTmpl: TemplateRef<any>;
  columns: any;
  rows: any;
  private _movimientos: Movimiento[];
  private _cuotas: Cuota[];

  constructor() { }

  ngOnInit() {
    this._movimientos = [];
    this._cuotas = [];
    this.columns = [
      { prop: 'dia' },
      { prop: 'ingreso', cellTemplate: this.currencyTmpl },
      { prop: 'retiro', cellTemplate: this.currencyTmpl },
      { prop: 'enCaja', cellTemplate: this.currencyTmpl }
    ];
  }

  calcularCaja(): any {
    let enCaja = 0;
    const flujo = [];
    const primerDia = startOfMonth(this.currentDate);
    const ultimoDia = this.getLimitDate();
    for (let i = this.cloneDate(primerDia) ; this.endCondition(i, ultimoDia) ; i = addDays(i, 1)) {
      const dia = format(i, 'DD/MM/YYYY');
      const pagosAlumnos = this.getPagosAlumnos(dia);
      const costosFijos = this.getImporteMovimientos(dia, TipoMovimiento.Costo);
      const ingresosFijos = this.getImporteMovimientos(dia, TipoMovimiento.Ingreso);
      const ingreso = ingresosFijos + pagosAlumnos;
      const retiro = costosFijos;
      enCaja = enCaja + ingreso - retiro;
      flujo.push({dia, ingreso, retiro, enCaja});
    }
    return flujo;
  }

  private cloneDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private getLimitDate(): Date {
    const currentDateString = format(this.currentDate, 'MM/YYYY');
    const todayString = format(new Date(), 'MM/YYYY');
    if (currentDateString > todayString) {
      return null;
    }
    if (currentDateString === todayString) {
      const todayDate = new Date();
      return new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
    }
    if (currentDateString < todayString) {
      const lastDayMonth = lastDayOfMonth(this.currentDate);
      return new Date(lastDayMonth.getFullYear(), lastDayMonth.getMonth(), lastDayMonth.getDate());
    }
  }

  private endCondition(d: Date, limitDate: Date): boolean {
    if (!limitDate) { return false; }
    const isGreatherThanToday = compareAsc(d, limitDate); // retorna 1 si d es mayor que hoy
    return isGreatherThanToday < 1;
  }

  private getPagosAlumnos(dia: string): number {
    let importe = 0;
    this._cuotas.forEach(cuota => {
      importe += cuota.pagos.filter(p => format(p.fechaPago, 'DD/MM/YYYY') === dia)
        .reduce((pv, cv) => pv + cv.importe, 0);
    });
    return importe;
  }

  private getImporteMovimientos(dia: string, tipoMovimiento: TipoMovimiento): number {
    return this._movimientos.filter(
      m => m.tipoMovimiento === tipoMovimiento && format(m.fechaEfectiva, 'DD/MM/YYYY') === dia
    ).reduce((pv, cv) => pv + cv.importe, 0);
  }

}
