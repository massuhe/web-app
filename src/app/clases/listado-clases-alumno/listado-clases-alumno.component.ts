import { Component, OnInit } from '@angular/core';
import { ClasesService } from '../services/clases.service';
import { DialogService } from '../../core/dialog.service';
import * as startOfWeek from 'date-fns/start_of_week';

import { Dia } from '../models/dia';

const mockedActivities = [
  {
    name: 'Musculación',
    id: 1
  },
  {
    name: 'Pilates',
    id: 2
  },
  {
    name: 'Boxeo',
    id: 3
  }
];

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

  constructor(private clasesService: ClasesService, private dialogService: DialogService) { }

  ngOnInit() {
    this.actividades = mockedActivities;
    this.actividadSeleccionada = this.actividades[0].id;
    this.week = startOfWeek(new Date(), {weekStartsOn: 1});
    this.populateScheduler();
  }

  handleWeekChange(week: Date) {
    this.week = week;
    this.populateScheduler();
  }

  handleActivityChange(actividadId: number) {
    this.actividadSeleccionada = actividadId;
    this.populateScheduler();
  }

  private populateScheduler() {
    this.showLoader = true;
    this.showScheduler = false;
    this.clasesService.getListadoClases(this.week, this.actividadSeleccionada)
      .subscribe(res => {
        if (res.dias.length > 0) {
          this.handleResponse(res);
        }
        this.showLoader = false;
      },
      err => {
        this.showLoader = false;
        this.dialogService.error('Se ha producido un error inesperado');
      }
    );
  }

  private handleResponse(res) {
    this.horas = res.horas;
    this.dias = res.dias;
    this.showScheduler = true;
    this.clases = res.alumno.clases;
    this.puedeRecuperar = 0; // res.alumno.puede_recuperar;
    this.checkClasesAlumno();
  }

  private checkClasesAlumno() {
    this.dias.forEach(d => d.clases.forEach( c => {
      c.checkAsisteClase(this.clases);
    }));
  }

}
