import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-listado-ejercicios',
  templateUrl: './listado-ejercicios.component.html',
  styleUrls: ['./listado-ejercicios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoEjerciciosComponent implements OnInit {

  rows: any;
  columns: any;
  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('indexTmpl') indexTmpl: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
    this.initTable();
  }

  filterData(input: string) {
    console.log(input);
  }

  private initTable(): void {
    this.rows = [];
    this.columns = [
      { name: '#', width: 50, cellTemplate: this.indexTmpl },
      { prop: 'nombre'},
      { prop: 'descripcion', name: 'Descripción'},
      {
        name: 'Acciones',
        cellTemplate: this.editTmpl,
        maxWidth: 160
      }
    ];
  }

}
