import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import * as addMonths from 'date-fns/add_months';
import { MovimientosService } from '../_services/movimientos.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil, finalize } from 'rxjs/operators';
import { Movimiento } from '../_models/Movimiento';
import { DialogService } from '../../core/dialog.service';
import { GENERIC_ERROR_MESSAGE, GUARDAR } from '../../app-constants';
import { TipoMovimiento } from '../_models/TipoMovimiento';
import { AgregarEditarMovimientoComponent } from './agregar-editar-movimiento/agregar-editar-movimiento.component';
import AppMessages from '../../_utils/AppMessages';
import { CuotasService } from '../_services/cuotas.service';
import { zip } from 'rxjs/observable/zip';
import { Cuota } from '../_models/Cuota';
import { TimezoneFixer } from '../../shared/_utils/TimezoneFixer';

const ENTIDAD = 'Los movimientos';

@Component({
  selector: 'app-balance-general',
  templateUrl: './balance-general.component.html',
  styleUrls: ['./balance-general.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BalanceGeneralComponent implements OnInit, OnDestroy {

  showLoader: boolean;
  currentDate: Date;
  cuotas: Cuota[];
  costosFijos: Movimiento[];
  ingresosFijos: Movimiento[];
  movimientosCaja: Movimiento[];
  movimientoAgregadoEditando: Movimiento;
  outDated: boolean;
  tipoMovimiento = TipoMovimiento;
  $destroy = new Subject<boolean>();
  @ViewChild(AgregarEditarMovimientoComponent) agregarEditarMovimiento;

  constructor(
    private movimientosService: MovimientosService,
    private cuotasService: CuotasService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.resetMovimientos();
    this.currentDate = new Date();
    this.fetchMovimientos();
  }

  changeDate(cantidad: number): void {
    this.currentDate = addMonths(this.currentDate, cantidad);
    this.fetchMovimientos();
  }

  fetchMovimientos(): void {
    const month = this.currentDate.getMonth() + 1;
    const year = this.currentDate.getFullYear();
    this.showLoader = true;
    zip(
      this.movimientosService.getOrFindLatest(month, year),
      this.cuotasService.get(undefined, month, year),
      (movimientos: Movimiento[], cuotas: Cuota[]) => ({movimientos, cuotas})
    )
    .pipe(
      takeUntil(this.$destroy),
      finalize(() => this.showLoader = false)
    )
    .subscribe(
      data => {
        this.onSuccessFetchMovimientos(data.movimientos);
        this.cuotas = data.cuotas;
      },
      error => this.onError(error)
    );
  }

  guardarMovimientos(): void {
    this.dialogService.confirm(AppMessages.confirm(ENTIDAD, GUARDAR, true))
    .then(
      ok => {
        const month = this.currentDate.getMonth() + 1;
        const year = this.currentDate.getFullYear();
        this.showLoader = true;
        this.movimientosService.store(month, year, [...this.costosFijos, ...this.ingresosFijos])
          .pipe(
            takeUntil(this.$destroy),
            finalize(() => this.showLoader = false)
          )
          .subscribe(
            (movimientos: Movimiento[]) => {
              this.dialogService.success(AppMessages.success(ENTIDAD, GUARDAR, true));
              this.onSuccessFetchMovimientos(movimientos);
            },
            error => this.onError(error)
          );
      },
      cancel => {}
    );
  }

  onSuccessFetchMovimientos(movimientos: Movimiento[]): void {
    this.resetMovimientos();
    if (!movimientos.length) { return ; }
    this.outDated = !(this.currentDate.getMonth() + 1 === movimientos[0].mes
                 && this.currentDate.getFullYear() === movimientos[0].anio);
    this.movimientosCaja = this.outDated ? [] : movimientos.filter(m => !!m.fechaEfectiva).map(m => m.clone());
    movimientos.forEach((m: Movimiento) => {
      m.tipoMovimiento === TipoMovimiento.Costo ?
        this.costosFijos = [...this.costosFijos, m]
        : this.ingresosFijos = [...this.ingresosFijos, m];
    });
  }

  handleDelete(id: number, tipoMovimiento: TipoMovimiento): void {
    const prop = `${tipoMovimiento}sFijos`;
    this[prop] = this[prop].filter((m: Movimiento) => id !== m.id);
  }

  handleAddButtonClick(tipoMovimiento: TipoMovimiento): void {
    this.movimientoAgregadoEditando = new Movimiento();
    this.movimientoAgregadoEditando.tipoMovimiento = tipoMovimiento;
    setTimeout(() => this.agregarEditarMovimiento.modal.show());
  }

  handleEditButtonClick(id: number, tipoMovimiento: TipoMovimiento): void {
    const movimientos: Movimiento[] = this[`${tipoMovimiento}sFijos`];
    this.movimientoAgregadoEditando = movimientos.find(m => m.id === id);
    setTimeout(() => this.agregarEditarMovimiento.modal.show());
  }

  handleAgregarEditarMovimiento(movimientoData: any): void {
    const idEdit = this.movimientoAgregadoEditando.id;
    this.movimientoAgregadoEditando = null;
    const movimientos: Movimiento[] = this[`${movimientoData.tipoMovimiento}sFijos`];
    const movimiento = movimientos.find(m => m.id === idEdit) || new Movimiento();
    movimiento.descripcion = movimientoData.descripcion;
    movimiento.importe = movimientoData.importe;
    movimiento.esPersonal = movimientoData.esPersonal;
    movimiento.tipoMovimiento = movimientoData.tipoMovimiento;
    if (!idEdit) {
      movimiento.id = [...this.costosFijos, ...this.ingresosFijos].reduce((pv, cv) => cv.id > pv ? cv.id : pv, 0) + 1;
      this[`${movimientoData.tipoMovimiento}sFijos`] = [...movimientos, movimiento];
    } else {
      movimiento.id = idEdit;
      this[`${movimientoData.tipoMovimiento}sFijos`] = movimientos.map(m => m.id === idEdit ? movimiento : m);
    }
  }

  handleCheckPagado(e: {id: number, value: boolean}, tipoMovimiento: TipoMovimiento): void {
    const movimientos: Movimiento[] = this[`${tipoMovimiento}sFijos`];
    const movimiento = movimientos.find(m => m.id === e.id);
    movimiento.fechaEfectiva = e.value ? TimezoneFixer.fixTimezone(new Date()) : null;
  }

  onError(res): void {
    this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }

  private resetMovimientos() {
    this.ingresosFijos = [];
    this.costosFijos = [];
    this.movimientosCaja = [];
  }

}
