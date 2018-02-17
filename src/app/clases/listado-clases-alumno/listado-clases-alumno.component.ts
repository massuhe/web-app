import { Component, OnInit, ViewChild } from '@angular/core';
import { ClasesService } from '../services/clases.service';
import { ActividadesService } from '../../actividades/services/actividades.service';
import { DialogService } from '../../core/dialog.service';
import * as startOfWeek from 'date-fns/start_of_week';
import { tap, mergeMap, switchMap } from 'rxjs/operators';
import { Dia } from '../models/dia';
import { Clase } from '../models/clase';

@Component({
  selector: 'app-listado-clases-alumno',
  templateUrl: './listado-clases-alumno.component.html',
  styleUrls: ['./listado-clases-alumno.component.scss']
})
export class ListadoClasesAlumnoComponent implements OnInit {

  @ViewChild('sched') scheduler;

  horas;
  dias;
  actividades;
  week;
  actividadSeleccionada;
  showScheduler;
  showLoader;
  clases;
  puedeRecuperar;
  showScreen;

  constructor(
    private clasesService: ClasesService,
    private actividadesService: ActividadesService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.showLoader = true;
    this.week = startOfWeek(new Date(), { weekStartsOn: 1 });
    this.actividadesService
      .getActividadesHoraLimite()
      .pipe(
        tap(acts => this.setActividades(acts)),
        mergeMap(_ => this.clasesService.getListadoClases(this.week, this.actividadSeleccionada))
      )
      .subscribe(res => this.populateScheduler(res), err => this.handleErrors(err));
  }

  handleWeekChange(week: Date) {
    this.week = week;
    this.showLoader = true;
    this.getClases();
  }

  handleActivityChange(actividadId: number) {
    this.actividadSeleccionada = this.actividades.find(a => a.id === actividadId);
    this.showLoader = true;
    this.getClases();
  }

  cancelarClase(dia: Dia, clase: Clase) {
    this.dialogService.confirm(`Está por cancelar su asistencia a la clase del ${dia.fecha} ${clase.horaInicio}. ¿Desea continuar?`)
      .then( _ => {
        this.showLoader = true;
        this.clasesService.cancelarClase(clase.id).pipe(
          tap(_r => this.handleCancelarResponse(clase)),
          switchMap(__ => this.clasesService.getListadoClases(this.week, this.actividadSeleccionada))
        )
        .subscribe(res => this.populateScheduler(res), err => this.handleErrors(err));
      });
  }

  recuperarClase(dia: Dia, clase: Clase) {
    this.dialogService.confirm(`Está por confirmar su asistencia a la clase del ${dia.fecha} ${clase.horaInicio}. ¿Desea continuar?`)
      .then( _ => {
        this.showLoader = true;
        this.clasesService.recuperarClase(clase.id).pipe(
          tap(_r => this.handleRecuperarResponse(clase)),
          switchMap(__ => this.clasesService.getListadoClases(this.week, this.actividadSeleccionada))
        )
        .subscribe(res => this.populateScheduler(res), err => this.handleErrors(err));
      });
  }

  private populateScheduler(res) {
    if (res.dias.length > 0) {
      this.handleResponse(res);
    } else {
      this.horas = [];
      this.dias = [];
      this.showScheduler = false;
    }
    this.showLoader = false;
    this.showScreen = true;
  }

  private handleErrors(err) {
    this.showLoader = false;
    this.dialogService.error(err.error.message || 'Se ha producido un error inesperado');
  }

  private getClases() {
    this.clasesService
      .getListadoClases(this.week, this.actividadSeleccionada)
      .subscribe(res => this.populateScheduler(res), err => this.handleErrors(err));
  }

  private setActividades(a) {
    this.actividades = a;
    this.actividadSeleccionada = a[0];
  }

  private handleResponse(res) {
    this.horas = res.horas;
    this.dias = res.dias;
    this.showScheduler = true;
    this.clases = res.alumno.clases;
    this.puedeRecuperar = res.alumno.puede_recuperar;
    this.checkClasesAlumno();
    this.refreshScheduler();
  }

  private handleCancelarResponse(clase: Clase) {
    clase.asiste = false;
    clase.lugaresDisponibles++;
    this.showLoader = false;
    this.dialogService.success('La asistencia ha sido cancelada correctamente');
    this.refreshScheduler();
  }

  private handleRecuperarResponse(clase: Clase) {
    clase.asiste = true;
    clase.lugaresDisponibles--;
    this.showLoader = false;
    this.dialogService.success('La asistencia ha sido confirmada correctamente');
    this.refreshScheduler();
  }

  private checkClasesAlumno() {
    this.dias.forEach(d =>
      d.clases.forEach(c => {
        c.checkAsisteClase(this.clases);
        c.checkVencida(d.fecha);
      })
    );
  }

  private refreshScheduler(reset = false) {
    setTimeout(() => this.scheduler.adjustHeight(reset));
  }

}
