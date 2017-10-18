import { Component, OnInit } from '@angular/core';
import * as compareAsc from 'date-fns/compare_asc';
import * as addMinutes from 'date-fns/add_minutes';
import * as format from 'date-fns/format';

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
          horaInicio: '08:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
        {
          horaInicio: '09:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
      ]
    },
    {
      fecha: '10-17-2017',
      clases: [
        {
          horaInicio: '08:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
        {
          horaInicio: '09:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
      ]
    },
    {
      fecha: '10-18-2017',
      clases: [
        {
          horaInicio: '08:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
        {
          horaInicio: '09:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
      ]
    },
    {
      fecha: '10-19-2017',
      clases: [
        {
          horaInicio: '08:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
        {
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
          horaInicio: '08:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
        {
          horaInicio: '09:00',
          alumnos: [],
          suspendida: false,
          motivo: ''
        },
      ]
    }
  ]
};

@Component({
  selector: 'app-listado-clases',
  templateUrl: './listado-clases.component.html',
  styleUrls: ['./listado-clases.component.scss']
})
export class ListadoClasesComponent implements OnInit {

  horas;
  dias;

  constructor() { }

  ngOnInit() {
    this.cargarHoras();
    this.dias = mockedData.dias;
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

  getClase(dia, horaClase) {
    return dia.clases.find(c => c.horaInicio === horaClase);
  }

  situacionClase(dia, horaClase) {
    const clase = this.getClase(dia, horaClase);
    if (!clase) {
      return 'disabled';
    }
    return clase.suspendida ? 'suspendida' : 'normal';
  }

  calcularLugaresDisponibles(clase) {
    return mockedData.cantidadAlumnosPorClase - clase.alumnos.length;
  }
}
