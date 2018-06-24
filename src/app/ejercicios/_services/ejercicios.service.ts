import { Injectable } from '@angular/core';
import { TipoEjercicio } from '../_models/TipoEjercicio';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { Ejercicio } from '../_models/Ejercicio';
import { of } from 'rxjs/observable/of';
import { map, share, tap } from 'rxjs/operators';
import { IGetEjerciciosAndTipos } from '../_interfaces/IGetEjerciciosAndTipos';

@Injectable()
export class EjerciciosService {

  constructor(private http: HttpClient) {

  }

  getEjerciciosAndTipos(): Observable<IGetEjerciciosAndTipos> {
    return this.http
    .get(`${environment.apiBaseUrl}/tiposEjercicios?includes[]=ejercicios`)
    .pipe(
      map(tiposEjercicioJson => this.buildEjerciciosAndTipos(tiposEjercicioJson)),
    );
  }

  getEjerciciosGroupedByTipo(): Observable<TipoEjercicio[]> {
    return this.http
      .get(`${environment.apiBaseUrl}/tiposEjercicios?includes[]=ejercicios`)
      .pipe(
        map(tiposEjercicioJson => this.groupEjerciciosByTipo(tiposEjercicioJson)),
      );
  }

  guardarEjercicio(ejercicio): Observable<Ejercicio> {
    return this.http.post(`${environment.apiBaseUrl}/ejercicios`, ejercicio)
      .pipe(
        map(ejercicioJson => this.toEjercicio(ejercicioJson))
      );
  }

  editarEjercicio(idEjercicio: number, ejercicioData: any): Observable<Ejercicio> {
    return this.http.put(`${environment.apiBaseUrl}/ejercicios/${idEjercicio}`, ejercicioData)
      .pipe(
        map(ejercicioJson => this.toEjercicio(ejercicioJson))
      );
  }

  eliminarEjercicio(idEjercicio: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/ejercicios/${idEjercicio}`);
  }

  guardarTipoEjercicio(tipoEjercicio): Observable<TipoEjercicio> {
    return this.http.post(`${environment.apiBaseUrl}/tiposEjercicios`, tipoEjercicio)
      .pipe(
        map(tipoEjercicioJson => this.toTipoEjercicio(tipoEjercicioJson))
      );
  }

  editarTipoEjercicio(idTipoEjercicio: number, tipoEjercicioData: any): Observable<TipoEjercicio> {
    return this.http.put(`${environment.apiBaseUrl}/tiposEjercicios/${idTipoEjercicio}`, tipoEjercicioData)
      .pipe(
        map(tipoEjercicioJson => this.toTipoEjercicio(tipoEjercicioJson))
      );
  }

  eliminarTipoEjercicio(idTipoEjercicio: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/tiposEjercicios/${idTipoEjercicio}`);
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

  private buildEjerciciosAndTipos(tiposEjercicioJson: any): IGetEjerciciosAndTipos {
    const ejercicios = [];
    const tipos = [];
    tiposEjercicioJson.forEach(tipoEjercicioJson => {
      const tipoEjercicio = new TipoEjercicio();
      tipoEjercicio.fillFromJson(tipoEjercicioJson);
      tipos.push(tipoEjercicio);
      if (!tipoEjercicioJson.ejercicios) { return ; }
      tipoEjercicioJson.ejercicios.forEach(ejercicioJson => {
        const ejercicio = new Ejercicio();
        ejercicio.fillFromJson(ejercicioJson);
        ejercicio.tipoEjercicio = tipoEjercicio;
        ejercicios.push(ejercicio);
      });
    });
    return {ejercicios, tipos};
  }

  private toEjercicio(ejercicioJson: any): Ejercicio {
    const ejercicio = new Ejercicio();
    ejercicio.fillFromJson(ejercicioJson);
    return ejercicio;
  }

  private toTipoEjercicio(tipoEjercicioJson: any): TipoEjercicio {
    const tipoEjercicio = new TipoEjercicio();
    tipoEjercicio.fillFromJson(tipoEjercicioJson);
    return tipoEjercicio;
  }

}
