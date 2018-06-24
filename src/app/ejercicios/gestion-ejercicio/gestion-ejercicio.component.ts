import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { EjerciciosService } from '../_services/ejercicios.service';
import { Ejercicio } from '../_models/Ejercicio';
import { TipoEjercicio } from '../_models/TipoEjercicio';
import { DialogService } from '../../core/dialog.service';
import AppMessages from '../../_utils/AppMessages';
import { IGetEjerciciosAndTipos } from '../_interfaces/IGetEjerciciosAndTipos';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { ENTIDADES, ELIMINAR } from '../../app-constants';

@Component({
  selector: 'app-gestion-ejercicio',
  templateUrl: './gestion-ejercicio.component.html',
  styleUrls: ['./gestion-ejercicio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionEjercicioComponent implements OnInit, OnDestroy {

  showScreenLoader: boolean;
  ejercicios: Ejercicio[];
  tiposEjercicio: TipoEjercicio[];
  destroy$ = new Subject<boolean>();

  constructor(
    private ejerciciosService: EjerciciosService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.ejercicios = [];
    this.tiposEjercicio = [];
    this.fetchEjercicios();
  }

  handleGuardarEjercicio(ejercicio: Ejercicio): void {
    const tipoEjercicio = this.tiposEjercicio.find(te => te.id === ejercicio.tipoEjercicio);
    const indexEjercicio = this.ejercicios.findIndex(e => e.id === ejercicio.id);
    ejercicio.tipoEjercicio = tipoEjercicio;
    if (indexEjercicio >= 0) {
      this.ejercicios[indexEjercicio] = ejercicio;
      return ;
    }
    this.ejercicios = [...this.ejercicios, ejercicio];
  }

  handleDeleteEjercicio(idEjercicio: number): void {
    this.dialogService.confirm(AppMessages.confirm(ENTIDADES.EJERCICIO, ELIMINAR)).then(
      ok => {
        this.showScreenLoader = true;
        this.ejerciciosService.eliminarEjercicio(idEjercicio)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            _ => this.successEliminarEjercicio(idEjercicio),
            error => this.handleError(error)
          );
      },
      cancel => {}
    );
  }

  handleGuardarTipoEjercicio(tipoEjercicio: TipoEjercicio): void {
    const indexTipoEjercicio = this.tiposEjercicio.findIndex(t => t.id === tipoEjercicio.id);
    if (indexTipoEjercicio >= 0) {
      this.tiposEjercicio[indexTipoEjercicio] = tipoEjercicio;
      this.ejercicios = this.ejercicios.map(e => {
        if ((e.tipoEjercicio as TipoEjercicio).id !== tipoEjercicio.id) {
          return e;
        }
        e.tipoEjercicio = tipoEjercicio;
        return e;
      });
      return ;
    }
    this.tiposEjercicio = [...this.tiposEjercicio, tipoEjercicio];
  }

  handleDeleteTipoEjercicio(idTipoEjercicio: number): void {
    this.dialogService.confirm(AppMessages.confirm(ENTIDADES.TIPO_EJERCICIO, ELIMINAR)).then(
      ok => {
        this.showScreenLoader = true;
        this.ejerciciosService.eliminarTipoEjercicio(idTipoEjercicio)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            _ => this.successEliminarTipoEjercicio(idTipoEjercicio),
            error => this.handleError(error)
          );
      },
      cancel => {}
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private fetchEjercicios(): void {
    this.showScreenLoader = true;
    this.ejerciciosService.getEjerciciosAndTipos()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => this.successFetchEjercicios(data),
        error => this.handleError(error)
      );
  }

  private successFetchEjercicios(data: IGetEjerciciosAndTipos): void {
    this.showScreenLoader = false;
    this.tiposEjercicio = data.tipos;
    this.ejercicios = data.ejercicios;
  }

  private successEliminarEjercicio(idEjercicio: number): void {
    this.showScreenLoader = false;
    this.dialogService.success(AppMessages.success(ENTIDADES.EJERCICIO, ELIMINAR));
    this.ejercicios = this.ejercicios.filter(e => e.id !== idEjercicio);
  }

  private successEliminarTipoEjercicio(idTipoEjercicio: number): void {
    this.showScreenLoader = false;
    this.dialogService.success(AppMessages.success(ENTIDADES.TIPO_EJERCICIO, ELIMINAR));
    this.tiposEjercicio = this.tiposEjercicio.filter(t => t.id !== idTipoEjercicio);
  }

  private handleError(error): void {
    this.showScreenLoader = false;
    this.dialogService.error(AppMessages.error(error));
  }

}
