import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listado-tipos-ejercicio',
  templateUrl: './listado-tipos-ejercicio.component.html',
  styleUrls: ['./listado-tipos-ejercicio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoTiposEjercicioComponent implements OnInit {

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
      {
        name: 'Acciones',
        cellTemplate: this.editTmpl,
        maxWidth: 160
      }
    ];
  }

}
