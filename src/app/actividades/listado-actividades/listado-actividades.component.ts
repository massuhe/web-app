import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
  OnDestroy
} from '@angular/core';
import { DialogService } from '../../core/dialog.service';
import { ActividadesService } from '../services/actividades.service';
import { Actividad } from '../models/Actividad';
import AppMessages from '../../_utils/AppMessages';
import { ELIMINAR, ENTIDADES } from '../../app-constants';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-listado-actividades',
  templateUrl: './listado-actividades.component.html',
  styleUrls: ['./listado-actividades.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoActividadesComponent implements OnInit, OnDestroy {
  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
  private actividades: Actividad[];
  rows;
  columns;
  showLoader: boolean;
  showScreenLoader: boolean;
  destroy$ = new Subject<boolean>();

  constructor(
    private actividadesService: ActividadesService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.actividades = [];
    this.rows = [];
    this.columns = [
      { prop: 'id', name: '#', width: 10 },
      { prop: 'nombre' },
      { prop: 'duracion' },
      { prop: 'totalAlumnos' },
      { prop: 'cantidadAlumnosPorClase', width: 200 },
      {
        name: 'Acciones',
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        width: 50
      }
    ];
    this.showLoader = true;
    this.getActividades();
  }

  eliminarActividad(idActividad) {
    this.dialogService.confirm(AppMessages.confirm(ENTIDADES.ACTIVIDAD, ELIMINAR, true, false))
      .then(_ => {
        this.showScreenLoader = true;
        this.actividadesService.delete(idActividad)
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe(
            suc => this.successEliminar(idActividad),
            err => this.handleError(err)
          );
      },
      cancelar => {});
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private removeActividadFromArray(idActividad) {
    const index = this.actividades.findIndex(a => a.id === idActividad);
    this.actividades = this.rows = [...this.actividades.slice(0, index), ...this.actividades.slice(index + 1)];
  }

  private getActividades() {
    this.actividadesService.getListadoActividades()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (actividades: Actividad[]) => this.successGetActividades(actividades),
        error => this.handleError(error)
      );
  }

  private successGetActividades(actividades: Actividad[]): void {
    this.actividades = actividades;
    this.rows = actividades;
    this.showLoader = false;
  }

  private successEliminar(idActividad: number): void {
    this.dialogService.success(AppMessages.success(ENTIDADES.ACTIVIDAD, ELIMINAR, true, false));
    this.removeActividadFromArray(idActividad);
    this.showScreenLoader = false;
  }

  private handleError(error): void {
    this.dialogService.error(AppMessages.error(error));
    this.showScreenLoader = false;
  }

}
