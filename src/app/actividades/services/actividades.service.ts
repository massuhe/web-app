import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Actividad } from '../models/Actividad';

@Injectable()
export class ActividadesService {

  constructor(private http: HttpClient) { }

  getActividadesHoraLimite() {
    return this.http
      .get(`${environment.apiBaseUrl}/actividades/horasLimites`)
      .mergeMap((json: any[]) => Observable.from(json))
      .map(this.toActividad)
      .toArray();
  }

  private toActividad(actividadJson) {
    const actividad = new Actividad();
    actividad.fillFromJson(actividadJson);
    return actividad;
  }

}
