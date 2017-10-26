import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as compareAsc from 'date-fns/compare_asc';
import * as addMinutes from 'date-fns/add_minutes';
import * as format from 'date-fns/format';
import { Dia } from '../models/dia';

@Injectable()
export class ClasesService {

  constructor(private http: HttpClient) { }

  getListadoClases(semana, actividad) {
    const formattedDate = format(semana, 'MM-DD-YYYY');
    return this.http
      .get(`${environment.apiBaseUrl}/clases/especificas?semana=${formattedDate}&actividad=${actividad}`)
      .map(json => {
        const horas = this.cargarHoras(json);
        const dias = this.cargarDias(json, horas);
        const alumno = json['alumno'];
        return {horas, dias, alumno};
      });
  }

  private cargarHoras(json) {
    const horas = [];
    const horaMinima = json.hora_minima.split(':');
    const horaMaxima = json.hora_maxima.split(':');
    let inicio = new Date(1990, 1, 1, parseInt(horaMinima[0], 10), parseInt(horaMinima[1], 10), parseInt(horaMinima[2], 10));
    const fin = new Date(1990, 1, 1, parseInt(horaMaxima[0], 10), parseInt(horaMaxima[1], 10), parseInt(horaMaxima[2], 10));
    while (compareAsc(inicio, fin) < 0) {
      horas.push(format(inicio, 'HH:mm:ss'));
      inicio = addMinutes(inicio, json.duracion_actividad);
    }
    return horas;
  }

  private cargarDias(json, horas) {
    const diasArray = [];
    const diasJson = json.dias;
    diasJson.forEach(d => {
      const dia = new Dia();
      dia.fillFromJson(d, {horas, cantidadAlumnosPorClase: json.cantidad_alumnos_por_clase, });
      diasArray.push(dia);
    });
    return diasArray;
  }

}
