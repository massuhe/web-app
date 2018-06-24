import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { Ejercicio } from '../_models/Ejercicio';
import { AgregarEjercicioComponent } from '../agregar-ejercicio/agregar-ejercicio.component';
import { TipoEjercicio } from '../_models/TipoEjercicio';

@Component({
  selector: 'app-listado-ejercicios',
  templateUrl: './listado-ejercicios.component.html',
  styleUrls: ['./listado-ejercicios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoEjerciciosComponent implements OnInit {

  columns: any;
  rows: any;
  ejercicioSelected: Ejercicio;
  private _ejercicios: Ejercicio[];

  @Input() tiposEjercicio: TipoEjercicio[];
  @Input() set ejercicios(value: Ejercicio[]) {
    this._ejercicios = value;
    this.rows = value;
  }
  @Output() onGuardar = new EventEmitter<Ejercicio>();
  @Output() onDelete = new EventEmitter<number>();

  @ViewChild(AgregarEjercicioComponent) agregarEjercicioModal;
  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('indexTmpl') indexTmpl: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
    this.initTable();
  }

  filterData(input: string): void {
    const upperInput = input.toUpperCase();
    this.rows = this._ejercicios.filter(e =>
      e.nombre.toUpperCase().includes(upperInput)
      || (e.tipoEjercicio as TipoEjercicio).nombre.toUpperCase().includes(upperInput)
    );
  }

  handleAgregarEjercicio(): void {
    this.ejercicioSelected = undefined;
    setTimeout(() => this.agregarEjercicioModal.modal.show());
  }

  handleEditEjercicio(ejercicio: Ejercicio): void {
    this.ejercicioSelected = ejercicio;
    setTimeout(() => this.agregarEjercicioModal.modal.show());
  }

  private initTable(): void {
    this.columns = [
      { name: '#', width: 50, cellTemplate: this.indexTmpl },
      { prop: 'nombre' },
      { prop: 'descripcion', name: 'Descripción' },
      { prop: 'tipoEjercicio.nombre', name: 'Tipo de ejercicio' },
      {
        name: 'Acciones',
        cellTemplate: this.editTmpl,
        maxWidth: 160
      }
    ];
  }

}
