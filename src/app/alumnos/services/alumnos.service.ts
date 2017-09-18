import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AlumnosService {

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<any> {
    return this.http
      .get('http://localhost:8000/usuarios/?includes[]=alumno');
  }

}
