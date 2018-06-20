import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { AlumnosService } from '../services/alumnos.service';
import { DialogService } from '../../core/dialog.service';
import { Alumno } from '../models/alumno';
import { GENERIC_ERROR_MESSAGE, ENTIDADES, ELIMINAR } from '../../app-constants';
import { FilterMode } from '../_constants/FilterMode';
import { FilterAlumnosService } from '../services/filter-alumnos.service';
import AppMessages from '../../_utils/AppMessages';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss'],
  providers: [ FilterAlumnosService ]
})
export class ListadoAlumnosComponent implements OnInit, OnDestroy {
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
  destroy$ = new Subject<boolean>();

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
    this.alumnosService.listadoAlumnos()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(
      (alumnos: Alumno[]) => this.successFetchListadoAlumnos(alumnos),
      res => this.handleErrors(res)
    );
  }

  filterData(value) {
    const filterText = value.toUpperCase();
    this.rows = this.filterAlumnosService.getRows(this.alumnos, this.filtroActivo, value);
  }

  borrarAlumno(alumno: Alumno) {
    this.dialogService
      .confirm(AppMessages.confirm(ENTIDADES.ALUMNO, ELIMINAR))
      .then(
        ok => {
          this.showScreenLoader = true;
          this.alumnosService.borrarAlumno(alumno.usuarioId)
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe(
            () => this.successBorrarAlumno(alumno.id),
            err => this.handleErrors(err)
          );
        },
        cancelar => {}
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private successFetchListadoAlumnos(alumnos: Alumno[]): void {
    this.alumnos = alumnos;
    this.rows = this.filterAlumnosService.getRows(this.alumnos, this.filtroActivo);
    this.showLoader = false;
  }

  private successBorrarAlumno(idAlumno: number): void {
    this.showScreenLoader = false;
    const indiceBorrar = this.alumnos.findIndex(
      a => a.id === idAlumno
    );
    this.alumnos = [
      ...this.alumnos.slice(0, indiceBorrar),
      ...this.alumnos.slice(indiceBorrar + 1)
    ];
    this.rows = this.filterAlumnosService.getRows(this.alumnos, this.filtroActivo);
    this.dialogService.success(AppMessages.success(ENTIDADES.ALUMNO, ELIMINAR));
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
    this.dialogService.error(AppMessages.error(res));
  }
}
