import { Injectable } from '@angular/core';
import { TipoEjercicio } from '../_models/TipoEjercicio';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { Ejercicio } from '../_models/Ejercicio';
import { of } from 'rxjs/observable/of';
import { map, share, tap } from 'rxjs/operators';

@Injectable()
export class EjerciciosService {

  constructor(private http: HttpClient) {

  }

  getEjercicios(): Observable<TipoEjercicio[]> {

  }

  getTiposEjercicio(): Observable<Ejercicio[]> {
    
  }

  getEjerciciosGroupedByTipo(): Observable<TipoEjercicio[]> {
    return this.http
      .get(`${environment.apiBaseUrl}/tiposEjercicios?includes[]=ejercicios`)
      .pipe(
        map(tiposEjercicioJson => this.groupEjerciciosByTipo(tiposEjercicioJson)),
      );
  }

  private groupEjerciciosByTipo(tiposEjercicioJson: any): TipoEjercicio[] {
    return tiposEjercicioJson.map(jsonTiEj => {
      const tipoEjercicio = new TipoEjercicio();
      tipoEjercicio.fillFromJson(jsonTiEj);
      tipoEjercicio.ejercicios = jsonTiEj.ejercicios && jsonTiEj.ejercicios.map(jsonEj => {
        const ejercicio = new Ejercicio();
        ejercicio.fillFromJson(jsonEj);
        return ejercicio;
      });
      return tipoEjercicio;
    });
  }

}
