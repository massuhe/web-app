import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Alumno } from '../models/alumno';

@Injectable()
export class AlumnosService {
  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<Alumno> {
    const a = this.serialize({filter_groups: [{filters: [{key: 'isAlumno', value: true, operator: 'eq', not: true}]}]});
    return this.http
      .get(`${environment.apiBaseUrl}/usuarios?includes[]=alumno&${a}`)
      .map((alumnos: any) =>
        alumnos.map(alumnoJson => {
          const alumno = new Alumno();
          alumno.fillFromJson(alumnoJson);
          return alumno;
        })
      );
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

  protected serialize(obj, prefix?) {
    const str = [];
    let p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        const k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
        str.push((v !== null && typeof v === 'object') ?
          this.serialize(v, k) :
          encodeURIComponent(k) + '=' + encodeURIComponent(v));
      }
    }
    return str.join('&');
  }
}
