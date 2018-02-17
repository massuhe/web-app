import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlumnosService } from '../services/alumnos.service';
import { DialogService } from '../../core/dialog.service';
import { Alumno } from '../models/alumno';
import { GENERIC_ERROR_MESSAGE } from '../../app-constants';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss']
})
export class ListadoAlumnosComponent implements OnInit {
  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
  @ViewChild('indexTmpl') indexTmpl: TemplateRef<any>;
  private alumnos;
  rows;
  columns;
  showLoader;

  constructor(
    private alumnosService: AlumnosService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.alumnos = [];
    this.rows = [];
    this.columns = [
      { prop: 'id', name: '#', width: 50, cellTemplate: this.indexTmpl },
      { prop: 'nombre' },
      { prop: 'apellido' },
      { prop: 'activo', width: 100 },
      {
        name: 'Acciones',
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        maxWidth: 160
      }
    ];
    this.showLoader = true;
    this.alumnosService.getAlumnos().subscribe(
      alumnos => {
        this.alumnos = alumnos;
        this.fillRows();
        this.showLoader = false;
      },
      res => this.handleErrors(res)
    );
  }

  fillRows() {
    this.rows = this.alumnos.slice().map(a => {
      a.activo = a.activo ? 'Si' : 'No';
      return a;
    });
  }

  filterData(value) {
    const filterText = value.toUpperCase();
    this.rows = this.alumnos.filter(
      a =>
        a.nombre.toUpperCase().includes(filterText) ||
        a.apellido.toUpperCase().includes(filterText)
    );
  }

  borrarAlumno(idAlumno) {
    this.dialogService
      .confirm('¿Está seguro que quiere borrar el alumno?')
      .then(
        () => {
          this.showLoader = true;
          this.alumnosService.borrarAlumno(idAlumno).subscribe(() => {
            this.showLoader = false;
            const indiceBorrar = this.alumnos.findIndex(a => a.id === idAlumno);
            this.alumnos = [...this.alumnos.slice(0, indiceBorrar), ...this.alumnos.slice(indiceBorrar + 1)];
            this.fillRows();
            this.dialogService.success('El alumno ha sido borrado correctamente');
          },
          err => {
            this.showLoader = false;
            this.dialogService.error(err.error || 'Se ha producido un error inesperado');
          });
        },
        () => {}
      );
  }

  private handleErrors(res) {
      this.showLoader = false;
      this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
  }
}
