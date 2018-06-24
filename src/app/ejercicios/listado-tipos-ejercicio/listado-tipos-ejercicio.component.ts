import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TipoEjercicio } from '../_models/TipoEjercicio';
import { AgregarTipoEjercicioComponent } from '../agregar-tipo-ejercicio/agregar-tipo-ejercicio.component';

@Component({
  selector: 'app-listado-tipos-ejercicio',
  templateUrl: './listado-tipos-ejercicio.component.html',
  styleUrls: ['./listado-tipos-ejercicio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoTiposEjercicioComponent implements OnInit {

  columns: any;
  rows: any;
  tipoEjercicioSelected: TipoEjercicio;
  private _tiposEjercicio: TipoEjercicio[];

  @Input() set tiposEjercicio(value: TipoEjercicio[]) {
    this._tiposEjercicio = value;
    this.rows = value;
  }
  @Output() onGuardar = new EventEmitter<TipoEjercicio>();
  @Output() onDelete = new EventEmitter<number>();

  @ViewChild(AgregarTipoEjercicioComponent) agregarTipoEjercicioModal;
  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('indexTmpl') indexTmpl: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
    this.initTable();
  }

  filterData(input: string) {
    this.rows = this._tiposEjercicio.filter(te => te.nombre.toUpperCase().includes(input.toUpperCase()));
  }

  handleAgregarTipoEjercicio(): void {
    this.tipoEjercicioSelected = undefined;
    setTimeout(() => this.agregarTipoEjercicioModal.modal.show());
  }

  handleEditTipoEjercicio(tipoEjercicio: TipoEjercicio): void {
    this.tipoEjercicioSelected = tipoEjercicio;
    setTimeout(() => this.agregarTipoEjercicioModal.modal.show());
  }

  private initTable(): void {
    this.columns = [
      { name: '#', width: 50, cellTemplate: this.indexTmpl },
      { prop: 'nombre'},
      {
        name: 'Acciones',
        cellTemplate: this.editTmpl,
        maxWidth: 160
      }
    ];
  }

}
