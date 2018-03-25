import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-listado-pagos',
  templateUrl: './listado-pagos.component.html',
  // styleUrls: ['./listado-pagos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoPagosComponent implements OnInit {

  private pagos;
  rows;
  columns;
  showLoader: boolean;
  showScreenLoader: boolean = false;

  constructor(
    // private seguridadService: SeguridadService,
    // private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.pagos = [
      {
        mes: '01',
        anio: '2018',
        alumno_id: 1,
        importe: 450
      }
    ];
    this.rows = [];
    this.columns = [
      // { name: '#', width: 50, cellTemplate: this.indexTmpl },
      { prop: 'mes' },
      { prop: 'anio' },
      { prop: 'alumno_id' },
      { prop: 'importe' }
      // {
      //   name: 'Acciones',
      //   cellTemplate: this.editTmpl,
      //   headerTemplate: this.hdrTpl,
      //   maxWidth: 160
      // }
    ];
    // this.showScreenLoader = false;
    this.showLoader = false;
    this.fillRows();
  }

  fillRows() {
    this.rows = this.pagos.slice();
  }

}
