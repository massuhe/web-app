import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClasesService } from '../services/clases.service';
import { ActividadesService } from '../../actividades/services/actividades.service';
import { DialogService } from '../../core/dialog.service';
import * as startOfWeek from 'date-fns/start_of_week';
import { mergeMap, tap } from 'rxjs/operators';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-listado-clases',
  templateUrl: './listado-clases.component.html',
  styleUrls: ['./listado-clases.component.scss']
})
export class ListadoClasesComponent implements OnInit {

  horas;
  dias;
  actividades;
  week;
  busquedaAlumno;
  actividadSeleccionada;
  showScheduler;
  showLoader;
  showScreen;

  constructor(
    private clasesService: ClasesService,
    private actividadesService: ActividadesService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.showLoader = true;
    this.week = startOfWeek(new Date(), { weekStartsOn: 1 });
    this.busquedaAlumno = '';
    this.actividadesService
      .getActividadesHoraLimite()
      .pipe(
        tap(acts => this.setActividades(acts)),
        mergeMap(_ => this.clasesService.getListadoClases(this.week, this.actividadSeleccionada)),
      )
      .subscribe(res => this.populateScheduler(res), err => this.handleErrors(err));

      /*
      .do(acts => this.setActividades(acts))
      .mergeMap(_ => this.clasesService.getListadoClases(this.week, this.actividadSeleccionada))
      .subscribe(res => this.populateScheduler(res), err => this.handleErrors(err));
      */
  }

  handleInput(value) {
    this.busquedaAlumno = value.toUpperCase();
    this.dias.forEach(d => {
      d.clases.forEach(c => {
        c.checkIncluyeAlumno(value);
      });
    });
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
      this.horas = res.horas;
      this.dias = res.dias;
      this.showScheduler = true;
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

}
