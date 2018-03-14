import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlumnosService } from '../services/alumnos.service';
import { DialogService } from '../../core/dialog.service';
import { Alumno } from '../models/alumno';
import { GENERIC_ERROR_MESSAGE } from '../../app-constants';
import { FilterMode } from '../_constants/FilterMode';
import { FilterAlumnosService } from '../services/filter-alumnos.service';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss'],
  providers: [ FilterAlumnosService ]
})
export class ListadoAlumnosComponent implements OnInit {
  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('indexTmpl') indexTmpl: TemplateRef<any>;
  @ViewChild('debeTmpl') debeTmpl: TemplateRef<any>;
  @ViewChild('debeAccionesTmpl') debeAccionesTmpl: TemplateRef<any>;
  alumnos: Alumno[];
  rows;
  columns;
  showLoader: boolean;
  showScreenLoader: boolean;
  showFilters: boolean;
  filtroActivo: number;

  constructor(
    private alumnosService: AlumnosService,
    private dialogService: DialogService,
    private filterAlumnosService: FilterAlumnosService
  ) {}

  ngOnInit() {
    this.alumnos = [];
    this.rows = [];
    this.filtroActivo = FilterMode.Todos;
    this.filterAlumnosService.initBaseProps(this.indexTmpl);
    this.columns = this.filterAlumnosService.getColumns(this.filtroActivo, this.getTemplates());
    this.showLoader = true;
    this.alumnosService.listadoAlumnos().subscribe(
      alumnos => {
        this.alumnos = alumnos;
        this.rows = this.filterAlumnosService.getRows(this.alumnos, this.filtroActivo);
        this.showLoader = false;
      },
      res => this.handleErrors(res)
    );
  }

  filterData(value) {
    const filterText = value.toUpperCase();
    this.rows = this.filterAlumnosService.getRows(this.alumnos, this.filtroActivo, value);
  }

  borrarAlumno(idAlumno) {
    this.dialogService
      .confirm('¿Está seguro que quiere borrar el alumno?')
      .then(
        () => {
          this.showScreenLoader = true;
          this.alumnosService.borrarAlumno(idAlumno).subscribe(
            () => {
              this.showScreenLoader = false;
              const indiceBorrar = this.alumnos.findIndex(
                a => a.id === idAlumno
              );
              this.alumnos = [
                ...this.alumnos.slice(0, indiceBorrar),
                ...this.alumnos.slice(indiceBorrar + 1)
              ];
              this.rows = this.filterAlumnosService.getRows(this.alumnos, this.filtroActivo);
              this.dialogService.success(
                'El alumno ha sido borrado correctamente'
              );
            },
            err => {
              this.showScreenLoader = false;
              this.dialogService.error(
                err.error || 'Se ha producido un error inesperado'
              );
            }
          );
        },
        () => {}
      );
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  handleFilterChange(filter: number) {
    this.filtroActivo = filter;
    this.columns = this.filterAlumnosService.getColumns(filter, this.getTemplates());
    this.rows = this.filterAlumnosService.getRows(this.alumnos, filter);
  }

  private getTemplates(): any {
    switch (this.filtroActivo) {
      case FilterMode.Todos:
        return {
          acciones: {
            cellTemplate: this.editTmpl
          }
        };
      case FilterMode.Deudores:
        return {
          debe: {
            cellTemplate: this.debeTmpl
          },
          acciones: {
            cellTemplate: this.debeAccionesTmpl
          }
        };
    }
  }

  private handleErrors(res) {
    this.showLoader = false;
    this.showScreenLoader = false;
    this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
  }
}
