import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { UsuariosService } from '../_services/usuarios.service';
import { DialogService } from '../../core/dialog.service';
import { GENERIC_ERROR_MESSAGE, ELIMINAR } from '../../app-constants';
import AppMessages from '../../_utils/AppMessages';
import { finalize } from 'rxjs/operators';
import { RutinaService } from '../../rutinas/_services/rutina.service';

const mockRows = [
  { id: 1, nombre: 'Juan', apellido: 'Perez', activo: 'Sí' },
  { id: 2, nombre: 'Juan', apellido: 'Perez', activo: 'Sí' },
  { id: 3, nombre: 'Juan', apellido: 'Perez', activo: 'Sí' },
  { id: 4, nombre: 'Juan', apellido: 'Perez', activo: 'Sí' },
  { id: 5, nombre: 'Juan', apellido: 'Perez', activo: 'Sí' },
  { id: 6, nombre: 'Juan', apellido: 'Perez', activo: 'Sí' },
  { id: 7, nombre: 'Juan', apellido: 'Perez', activo: 'Sí' },
  { id: 8, nombre: 'Juan', apellido: 'Perez', activo: 'Sí' },
  { id: 9, nombre: 'Juan', apellido: 'Perez', activo: 'Sí' },
  { id: 10, nombre: 'Juan', apellido: 'Perez', activo: 'Sí' },
  { id: 11, nombre: 'Juan', apellido: 'Perez', activo: 'Sí' },
  { id: 12, nombre: 'Juan', apellido: 'Perez', activo: 'Sí' },
  { id: 13, nombre: 'Juan', apellido: 'Perez', activo: 'Sí' }
];
const ENTIDAD = 'El usuario';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoUsuariosComponent implements OnInit {

  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
  @ViewChild('indexTmpl') indexTmpl: TemplateRef<any>;
  private usuarios;
  rows;
  columns;
  showLoader: boolean;
  showScreenLoader: boolean;

  constructor(
    private usuariosService: UsuariosService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.usuarios = [];
    this.rows = [];
    this.columns = [
      { name: '#', width: 50, cellTemplate: this.indexTmpl },
      { prop: 'nombre' },
      { prop: 'apellido' },
      { prop: 'rol.nombre', name: 'Rol'},
      { prop: 'activo', width: 100 },
      {
        name: 'Acciones',
        cellTemplate: this.editTmpl,
        maxWidth: 160
      }
    ];
    this.showLoader = true;
    this.usuariosService.getUsuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios;
        this.fillRows();
        this.showLoader = false;
      },
      res => this.handleErrors(res)
    );
  }

  fillRows() {
    this.rows = this.usuarios.map(u => {
      u.activo = u.activo ? 'Si' : 'No';
      return u;
    });
  }

  filterData(value) {
    const filterText = value.toUpperCase();
    this.rows = this.usuarios.filter(
      u =>
        u.nombre.toUpperCase().includes(filterText) ||
        u.apellido.toUpperCase().includes(filterText)
    );
  }

  borrarUsuario(idUsuario): void {
    this.dialogService
      .confirm(AppMessages.confirm(ENTIDAD, ELIMINAR))
      .then(_ => {
          this.showScreenLoader = true;
          this.usuariosService.borrarUsuario(idUsuario).pipe(finalize(() => this.showScreenLoader = false))
          .subscribe(res => {
            this.showScreenLoader = false;
            const indiceBorrar = this.usuarios.findIndex(a => a.id === idUsuario);
            this.usuarios = [...this.usuarios.slice(0, indiceBorrar), ...this.usuarios.slice(indiceBorrar + 1)];
            this.fillRows();
            this.dialogService.success(AppMessages.success(ENTIDAD, ELIMINAR));
          }, err => this.dialogService.error(err.error.clientMessage || GENERIC_ERROR_MESSAGE));
        }, _ => {}
      );
  }

  private handleErrors(res) {
      this.showLoader = false;
      this.showScreenLoader = false;
      this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
  }

}
