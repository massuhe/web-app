import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PagosService } from '../_services/pagos.service';

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
    private pagosService: PagosService,
    // private dialogService: DialogService
  ) {}

  ngOnInit() {
    // this.pagos = [];
    this.pagos = [
      {
        apellido: 'Gonzalez',
        nombre: 'Renzo',
        alumno_id: 1,
        mes: '01',
        anio: '2018',
        importe: 450,
        fechaPago: '10-01-2018 19:30',
        totalCuota: 600
      }
    ];
    this.rows = [];
    this.columns = [
      // { name: '#', width: 50, cellTemplate: this.indexTmpl },
      { prop: 'apellido' },
      { prop: 'nombre' },
      { prop: 'mes' },
      { prop: 'anio' },
      { prop: 'importe' },
      { prop: 'fechaPago' },
      { prop: 'totalCuota' }
      // {
      //   name: 'Acciones',
      //   cellTemplate: this.editTmpl,
      //   headerTemplate: this.hdrTpl,
      //   maxWidth: 160
      // }
    ];
    // this.showScreenLoader = false;
    this.showLoader = true;
    this.pagosService.getPagos().subscribe(
      pagos => {
        console.log('PAGOS TRAIDOS OBJETIZADOS: ', pagos);
        // this.pagos = pagos;
        this.fillRows();
        this.showLoader = false;
      },
      res => this.handleErrors(res)
    );
    this.fillRows();
  }

  fillRows() {
    this.rows = this.pagos.slice();
  }

  private handleErrors(res) {
    // this.showLoader = false;
    // this.showScreenLoader = false;
    // this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
  }

}
