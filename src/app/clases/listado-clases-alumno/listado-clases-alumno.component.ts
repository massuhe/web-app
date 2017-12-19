import { Component, OnInit } from '@angular/core';
import { ClasesService } from '../services/clases.service';
import { ActividadesService } from '../../actividades/services/actividades.service';
import { DialogService } from '../../core/dialog.service';
import * as startOfWeek from 'date-fns/start_of_week';
import { tap, mergeMap } from 'rxjs/operators';
import { Dia } from '../models/dia';

@Component({
  selector: 'app-listado-clases-alumno',
  templateUrl: './listado-clases-alumno.component.html',
  styleUrls: ['./listado-clases-alumno.component.scss']
})
export class ListadoClasesAlumnoComponent implements OnInit {

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
    this.dialogService.error('Se ha producido un error inesperado');
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
  }

  private checkClasesAlumno() {
    this.dias.forEach(d =>
      d.clases.forEach(c => {
        c.checkAsisteClase(this.clases);
      })
    );
  }

}
