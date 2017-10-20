import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as compareAsc from 'date-fns/compare_asc';
import * as addMinutes from 'date-fns/add_minutes';
import * as format from 'date-fns/format';

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

  constructor() { }

  ngOnInit() {
    this.cargarHoras();
    this.dias = this.cargarDias(mockedData.dias, this.horas);
    this.actividades = mockedActivities;
    this.week = new Date();
    this.busquedaAlumno = '';
  }

  cargarDias(diasJson, horas) {
    const diasArray = [];
    diasJson.forEach(d => {
      const dia = new Dia();
      dia.fillFromJson(d, {horas, cantidadAlumnosPorClase: mockedData.cantidadAlumnosPorClase});
      diasArray.push(dia);
    });
    return diasArray;
  }

  cargarHoras() {
    this.horas = [];
    const horaMinima = mockedData.horaMinima.split(':');
    const horaMaxima = mockedData.horaMaxima.split(':');
    let inicio = new Date(1990, 1, 1, parseInt(horaMinima[0], 10), parseInt(horaMinima[1], 10));
    const fin = new Date(1990, 1, 1, parseInt(horaMaxima[0], 10), parseInt(horaMaxima[1], 10));
    while (compareAsc(inicio, fin) < 0) {
      this.horas.push(format(inicio, 'HH:mm'));
      inicio = addMinutes(inicio, mockedData.duracionActividad);
    }
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
  }

}
