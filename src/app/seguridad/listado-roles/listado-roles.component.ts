import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { SeguridadService } from '../_services/seguridad.service';
import { DialogService } from '../../core/dialog.service';
import { GENERIC_ERROR_MESSAGE, ELIMINAR } from '../../app-constants';
import AppMessages from '../../_utils/AppMessages';

const ENTIDAD = 'El rol';

@Component({
  selector: 'app-listado-roles',
  templateUrl: './listado-roles.component.html',
  styleUrls: ['./listado-roles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoRolesComponent implements OnInit {

  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
  @ViewChild('indexTmpl') indexTmpl: TemplateRef<any>;
  private roles;
  rows;
  columns;
  showLoader: boolean;
  showScreenLoader: boolean;

  constructor(
    private seguridadService: SeguridadService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.roles = [];
    this.rows = [];
    this.columns = [
      { name: '#', width: 50, cellTemplate: this.indexTmpl },
      { prop: 'nombre' },
      {
        name: 'Acciones',
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        maxWidth: 160
      }
    ];
    this.showLoader = true;
    this.seguridadService.getRoles().subscribe(
      roles => {
        this.roles = roles;
        this.fillRows();
        this.showLoader = false;
      },
      res => this.handleErrors(res)
    );
  }

  fillRows() {
    this.rows = this.roles.slice();
  }

  filterData(value) {
    const filterText = value.toUpperCase();
    this.rows = this.roles.filter(
      r => r.nombre.toUpperCase().includes(filterText)
    );
  }

  borrarRol(idRol: number): void {
    this.dialogService
      .confirm(AppMessages.confirm(ENTIDAD, ELIMINAR))
      .then(
        () => {
          this.showScreenLoader = true;
          this.seguridadService.eliminarRol(idRol).subscribe(() => {
            this.showScreenLoader = false;
            const indiceBorrar = this.roles.findIndex(r => r.id === idRol);
            this.roles = [...this.roles.slice(0, indiceBorrar), ...this.roles.slice(indiceBorrar + 1)];
            this.fillRows();
            this.dialogService.success(AppMessages.success(ENTIDAD, ELIMINAR));
          },
          err => this.handleErrors(err));
        },
        () => {}
      );
  }

  private handleErrors(res) {
      this.showLoader = false;
      this.showScreenLoader = false;
      this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
  }

}
