import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { mergeMap, map, toArray, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Actividad } from '../models/Actividad';

@Injectable()
export class ActividadesService {

  constructor(private http: HttpClient) { }

  get(selectAttributes: string[] = []): Observable<Actividad[]> {
    const endPoint = `/actividades/${this.parseSelectAttributes(selectAttributes)}`;
    return this.http
      .get(`${environment.apiBaseUrl}${endPoint}`)
      .pipe(
        switchMap((json: any[]) => from(json)),
        map(this.toActividad),
        toArray()
      );
  }

  getListadoActividades(): Observable<Actividad[]> {
    return this.http
      .get(`${environment.apiBaseUrl}/actividades/listado`)
      .pipe(
        switchMap((json: any[]) => from(json)),
        map(this.toActividad),
        toArray()
      );
  }

  getActividadesHoraLimite(): Observable<Actividad[]> {
    return this.http
      .get(`${environment.apiBaseUrl}/actividades/horasLimites`)
      .pipe(
        mergeMap((json: any[]) => from(json)),
        map(this.toActividad),
        toArray()
      );
  }

  getById(idActividad: number): Observable<Actividad> {
    return this.http
      .get(`${environment.apiBaseUrl}/actividades/${idActividad}?includes[]=dias_horarios&includes[]=dias_horarios.horarios`)
      .pipe(
        map(this.toActividad)
      );
  }

  post(data) {
    return this.http.post(`${environment.apiBaseUrl}/actividades`, data);
  }

  put(idActividad, data) {
    return this.http.put(`${environment.apiBaseUrl}/actividades/${idActividad}`, data);
  }

  delete(idActividad) {
    return this.http.delete(`${environment.apiBaseUrl}/actividades/${idActividad}`);
  }

  private toActividad(actividadJson) {
    const actividad = new Actividad();
    actividad.fillFromJson(actividadJson);
    return actividad;
  }

  private parseSelectAttributes(selectAttributes: string[]): string {
    return selectAttributes.length === 0 ? '' : `?${selectAttributes.map(sa => `select[]=${sa}`).join('&')}`;
  }

}
