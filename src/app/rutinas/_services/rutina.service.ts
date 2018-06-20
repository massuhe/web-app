import { Injectable, OnDestroy } from '@angular/core';
import { RUTINA_JSON } from './rutina-mock';
import { Observable } from 'rxjs/Observable';
import { Rutina } from '../_models/rutina';
import { Dia } from '../_models/dia';
import { Serie } from '../_models/Serie';
import { ItemSerie } from '../_models/ItemSerie';
import { RutinaBuilder } from './rutina-builder';
import { IGetRutina } from '../_interfaces/IGetRutina';
import { environment } from '../../../environments/environment';
import { IGetRutinaParams } from '../_interfaces/IGetRutinaParams';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';
import { Clase } from '../../clases/models/clase';
import { ParametroItemSerie } from '../_models/ParametroItemSerie';

@Injectable()
export class RutinaService implements OnDestroy {
  data: any = {
    idAlumno: undefined,
    rutinas: []
  };

  constructor(private http: HttpClient) {}

  getRutina(
    idAlumno?: number,
    params: IGetRutinaParams = {}
  ): Observable<IGetRutina> {
    if (idAlumno !== this.data.idAlumno) {
      this.data = { idAlumno, rutinas: [] };
    }
    const numeroRutina = params.numeroRutina || 0;
    const rutina = this.data.rutinas && this.data.rutinas[numeroRutina];
    const shouldFetchRutina =
      !rutina || (params.withUltimaSemana && !rutina.ultimaSemana);
    return shouldFetchRutina
      ? this.fetchRutina(idAlumno, params).pipe(
          map((json: any) => {
            const clases  = json.clases.map(c => this.toClase(c));
            return {
              clases,
              rutina: json.rutina && this.toRutina(json.rutina, clases),
              ultimaSemana: Number(json.ultima_semana),
              alumno: json.alumno
            };
          }),
          tap((data: IGetRutina) => (this.data.rutinas[numeroRutina] = data))
        )
      : of(rutina);
  }

  guardarRutina(rutina): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/rutinas`, { rutina }).pipe(
      tap(json => {
        const newRutinaData = {
          rutina: json.rutina && this.toRutina(json.rutina, []),
          ultimaSemana: Number(json.ultima_semana),
          alumno: json.alumno
        };
        if (this.data.rutinas[0].rutina) {
          const oldRutina = this.data.rutinas[0];
          this.data.rutinas.push(oldRutina);
        }
        this.data.rutinas[0] = newRutinaData;
      })
    );
  }

  editarRutina(rutina): Observable<any> {
    return this.http
      .put(`${environment.apiBaseUrl}/rutinas/${rutina.id}`, { rutina })
      .pipe(
        tap(
          json =>
            (this.data.rutinas[0] = {
              ...this.data.rutinas[0],
              rutina: this.toRutina(json, this.data.rutinas[0].clases)
            })
        )
      );
  }

  guardarDetalles(detalles, idAlumno: number, clase: Clase): Observable<any> {
    let url = `${environment.apiBaseUrl}/rutinas/`;
    url += idAlumno ? `${idAlumno}/cargarDetalles` : 'cargarDetalles';
    return this.http
      .post(url, detalles)
      .pipe(tap(_ => this.agregarDetalleARutina(detalles, clase)));
  }

  ngOnDestroy() {
    console.log('me destruio');
  }

  private fetchRutina(
    idAlumno: number,
    params: IGetRutinaParams
  ): Observable<any> {
    let url =
      environment.apiBaseUrl +
      (idAlumno ? `/alumnos/${idAlumno}/rutina` : '/rutina') +
      (params ? '?' : '');
    const paramsArr = [];
    if (params.numeroRutina) {
      paramsArr.push(`numeroRutina=${params.numeroRutina}`);
    }
    if (params.withUltimaSemana) {
      paramsArr.push('withUltimaSemana=1');
    }
    url += paramsArr.join('&');
    return this.http.get(url);
  }

  private toRutina(json: any, clases: Clase[]): Rutina {
    const rutina = RutinaBuilder.build(json, clases);
    return rutina;
  }

  private toClase(json: any): Clase {
    const clase = new Clase();
    clase.fillFromJsonClaseEspecifica(json);
    return clase;
  }

  private agregarDetalleARutina(info, clase: Clase): void {
    const { dia, semana, detalles } = info;
    const diaRutina: Dia = this.data.rutinas[0].rutina.dias[dia];
    const parametrosSemana = diaRutina.series
      .map(s =>
        s.items
          .map(i => i.parametrosSemana)
          .reduce((pv, cv) => [...pv, ...cv], [])
      )
      .reduce((pv, cv) => [...pv, ...cv], []);
    detalles.forEach(d => {
      const parametroSemana = parametrosSemana.find(
        ps => ps.id === d.parametroSemana
      );
      const parametroItemSerie = new ParametroItemSerie();
      parametroItemSerie.fillFromJson(d);
      parametroItemSerie.clase = clase;
      parametroSemana.parametros.push(parametroItemSerie);
    });
  }
}
