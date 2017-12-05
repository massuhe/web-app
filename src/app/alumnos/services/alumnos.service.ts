import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Alumno } from '../models/alumno';
import { SerializeService } from '../../core/serialize.service';

@Injectable()
export class AlumnosService {
  constructor(private http: HttpClient, private serializeService: SerializeService) {}

  getAlumnos(search?: string, useAlumnoId?: boolean): Observable<Alumno[]> {
    const f = this.getFilterGroups(search);
    return this.http
      .get(
        `${environment.apiBaseUrl}/usuarios?includes[]=alumno&${this.serializeService.serialize(f)}`
      )
      .pipe(map(al => this.toAlumno(al, useAlumnoId)));
  }

  borrarAlumno(id) {
    return this.http.delete(`${environment.apiBaseUrl}/usuarios/${id}`);
  }

  post(data) {
    return this.http.post(`${environment.apiBaseUrl}/usuarios`, data);
  }

  put(id: number, data) {
    return this.http.put(`${environment.apiBaseUrl}/usuarios/${id}`, data);
  }

  protected toAlumno(alumnos: any, useAlumnoId: boolean) {
    return alumnos.map(alumnoJson => {
      const alumno = new Alumno();
      alumno.fillFromJson(alumnoJson, {useAlumnoId});
      return alumno;
    });
  }

  // protected serialize(obj, prefix?) {
  //   const str = [];
  //   let p;
  //   for (p in obj) {
  //     if (obj.hasOwnProperty(p)) {
  //       const k = prefix ? prefix + '[' + p + ']' : p,
  //         v = obj[p];
  //       str.push(
  //         v !== null && typeof v === 'object'
  //           ? this.serialize(v, k)
  //           : encodeURIComponent(k) + '=' + encodeURIComponent(v)
  //       );
  //     }
  //   }
  //   return str.join('&');
  // }

  protected getFilterGroups(search) {
    const f = {
      filter_groups: [
        {
          filters: [{ key: 'isAlumno', value: true, operator: 'eq', not: true }]
        }
      ]
    };
    if (search) {
      f.filter_groups.push({
        filters: [
          { key: 'nombreApellido', value: search, operator: 'eq', not: true }
        ]
      });
    }
    return f;
  }
}
