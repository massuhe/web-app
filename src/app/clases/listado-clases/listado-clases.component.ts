import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClasesService } from '../services/clases.service';
import { DialogService } from '../../core/dialog.service';
import * as startOfWeek from 'date-fns/start_of_week';

import { Dia } from '../models/dia';

const mockedData = {
  cantidadAlumnosPorClase: 7,
  horaMinima: '08:00',
  horaMaxima: '10:00',
  duracionActividad: 60,
  dias: [
    {
      fecha: '10-16-2017',
      clases: [
        {
          id: 1,
          horaInicio: '08:00',
          alumnos: [{nombre: 'Esteban', apellido: 'Massuh'}],
          suspendida: false,
          motivo: ''
        },
        {
          id: 2,
          horaInicio: '09:00',
          alumnos: [],
          suspendida: true,
          motivo: 'Se rompio la puerta'
        },
      ]
    },
    {
      fecha: '10-17-2017',
      clases: [
        {
          id: 3,
          horaInicio: '08:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
        {
          id: 4,
          horaInicio: '09:00',
          alumnos: [{nombre: 'Juan', apellido: 'Perez'}],
          suspendida: false,
          motivo: ''
        },
      ]
    },
    {
      fecha: '10-18-2017',
      clases: [
        {
          id: 5,
          horaInicio: '08:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
        // {
        //   id: 6,
        //   horaInicio: '09:00',
        //   alumnos: [],
        //   suspendida: false,
        //   motivo: ''
        // },
      ]
    },
    {
      fecha: '10-19-2017',
      clases: [
        {
          id: 7,
          horaInicio: '08:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
        {
          id: 8,
          horaInicio: '09:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
      ]
    },
    {
      fecha: '10-20-2017',
      clases: [
        {
          id: 9,
          horaInicio: '08:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
        {
          id: 10,
          horaInicio: '09:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
      ]
    }
  ]
};

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

  constructor(private clasesService: ClasesService, private dialogService: DialogService) { }

  ngOnInit() {
    this.actividades = mockedActivities;
    this.actividadSeleccionada = this.actividades[0].id;
    this.week = startOfWeek(new Date(), {weekStartsOn: 1});
    this.busquedaAlumno = '';
    this.populateScheduler();
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
          this.horas = res.horas;
          this.dias = res.dias;
          this.showScheduler = true;
        }
        this.showLoader = false;
      },
      err => {
        this.showLoader = false;
        this.dialogService.error('Se ha producido un error inesperado');
      }
    );
  }

}
