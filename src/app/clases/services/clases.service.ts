import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError, debounceTime, delay } from 'rxjs/operators';
import * as compareAsc from 'date-fns/compare_asc';
import * as addMinutes from 'date-fns/add_minutes';
import * as format from 'date-fns/format';
import { Dia } from '../models/dia';
import { Clase } from '../models/clase';
import { of } from 'rxjs/observable/of';
import { SerializeService } from '../../core/serialize.service';

@Injectable()
export class ClasesService {

  constructor(private http: HttpClient, private serializeService: SerializeService) { }

  getListadoClases(semana, actividad) {
    const formattedDate = format(semana, 'MM-DD-YYYY');
    return this.http
      .get(`${environment.apiBaseUrl}/clasesEspecificas/listado?semana=${formattedDate}&actividad=${actividad.id}`)
      .pipe(
        map(json => {
        const horas = this.cargarHoras(json, actividad);
        const dias = this.cargarDias(json, actividad, horas);
        const alumno = json['alumno'];
        return {horas, dias, alumno};
      }));
  }

  getDetalleClases(idClase: number): Observable<Clase> {
    const parametros = {
      includes: ['descripcionClase', 'alumnos.usuario'],
      select: ['id', 'suspendida', 'motivo', 'alumnos.id', 'alumnos.asistencia', 'alumnos.usuario', 'descripcion_clase.hora_inicio']
    };
    return this.http
    .get(`${environment.apiBaseUrl}/clasesEspecificas/${idClase}?${this.serializeService.serialize(parametros)}`)
    .pipe(
      map(this.toClase),
      delay(1000)
    );
  }

  guardarClase(clase: Clase): Observable<any> {
    return this.http
      .put(`${environment.apiBaseUrl}/clasesEspecificas/${clase.id}`, clase);
  }

  cancelarClase(idClase: number): Observable<any> {
    return this.http.patch(`${environment.apiBaseUrl}/clasesEspecificas/cancelar`, {idClase});
  }

  private toClase(c) {
    const clase = new Clase();
    clase.fillFromJsonClaseEspecifica(c);
    return clase;
  }

  private cargarHoras(json, actividad) {
    const horas = [];
    const horaMinima = actividad.horaMinima.split(':');
    const horaMaxima = actividad.horaMaxima.split(':');
    let inicio = new Date(1990, 1, 1, parseInt(horaMinima[0], 10), parseInt(horaMinima[1], 10), parseInt(horaMinima[2], 10));
    const fin = new Date(1990, 1, 1, parseInt(horaMaxima[0], 10), parseInt(horaMaxima[1], 10), parseInt(horaMaxima[2], 10));
    while (compareAsc(inicio, fin) <= 0) {
      horas.push(format(inicio, 'HH:mm:ss'));
      inicio = addMinutes(inicio, actividad.duracion);
    }
    return horas;
  }

  private cargarDias(json, actividad, horas) {
    const diasArray = [];
    const diasJson = json.dias;
    diasJson.forEach(d => {
      const dia = new Dia();
      dia.fillFromJson(d, {horas, cantidadAlumnosPorClase: actividad.cantidadAlumnosPorClase, });
      diasArray.push(dia);
    });
    return diasArray;
  }

}
