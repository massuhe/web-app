import { Component, OnInit, ViewEncapsulation, Input, SimpleChanges, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { TipoMovimiento } from '../../_models/TipoMovimiento';
import { Movimiento } from '../../_models/Movimiento';

@Component({
  selector: 'app-movimientos-fijos',
  templateUrl: './movimientos-fijos.component.html',
  styleUrls: ['./movimientos-fijos.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MovimientosFijosComponent implements OnInit {

  @Input() tipo: TipoMovimiento;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onAddButtonClick = new EventEmitter<void>();
  @Output() onEditButtonClick = new EventEmitter<number>();
  @Output() onCheckPagado = new EventEmitter<{id: number, value: boolean}>();
  @ViewChild('accionesTmpl') accionesTmpl: TemplateRef<any>;
  @ViewChild('importeTmpl') importeTmpl: TemplateRef<any>;
  @ViewChild('pagadoTmpl') pagadoTmpl: TemplateRef<any>;
  rows: any;
  columns: any;
  showMovimientosGYM: boolean;
  showMovimientosPersonales: boolean;
  private _data: Movimiento[];
  @Input() set data(val: Movimiento[]) {
    this._data = val;
    this.filterData();
  }

  constructor() { }

  ngOnInit() {
    this.showMovimientosGYM = true;
    this.showMovimientosPersonales = true;
    this.columns = [
      {prop: 'descripcion'},
      {name: 'Importe', cellTemplate: this.importeTmpl, width: 100},
      {name: 'Pagado', cellTemplate: this.pagadoTmpl, width: 100},
      {name: 'Acciones', cellTemplate: this.accionesTmpl}];
  }

  handleCheckboxChange(prop: string): void {
    this[prop] = !this[prop];
    this.filterData();
  }

  handleEsPersonalChange(value: boolean, id: number): void {
    this.onCheckPagado.emit({id, value});
  }

  handleDelete(id: number) {
    this.onDelete.emit(id);
  }

  handleAdd() {
    this.onAddButtonClick.emit();
  }

  handleEdit(id: number) {
    this.onEditButtonClick.emit(id);
  }

  filterData() {
    this.rows = this._data.filter(m => (this.showMovimientosGYM && !m.esPersonal) || (this.showMovimientosPersonales && m.esPersonal));
  }

  getRowClass(row: Movimiento) {
    return {
      'movimiento-fijo-es-personal': row.esPersonal
    };
  }

}
