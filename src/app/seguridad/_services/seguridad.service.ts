import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Rol } from '../_models/rol';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Permiso } from '../_models/permiso';

@Injectable()
export class SeguridadService {

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Rol[]> {
    return this.http.get(`${environment.apiBaseUrl}/roles`).pipe(
      map((json: any) => json.map(j => this.toRol(j)))
    );
  }

  getById(idRol: number): Observable<Rol> {
    return this.http.get(`${environment.apiBaseUrl}/roles/${idRol}?includes[]=permisos`).pipe(
      map((json: any) => this.toRol(json))
    );
  }

  guardarRol(json: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/roles`, json);
  }

  editarRol(idRol: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/roles/${idRol}`, data);
  }

  eliminarRol(idRol: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/roles/${idRol}`);
  }

  getPermisos(): Observable<Permiso[]> {
    return this.http.get(`${environment.apiBaseUrl}/permisos`).pipe(
      map((json: any) => json.map(j => this.toPermiso(j)))
    );
  }

  private toRol(json: any): Rol {
    const rol = new Rol();
    rol.fillFromJson(json);
    rol.permisos = json.permisos ? json.permisos.map(p => this.toPermiso(p)) : undefined;
    return rol;
  }

  private toPermiso(json: any): Permiso {
    const permiso = new Permiso();
    permiso.fillFromJson(json);
    return permiso;
  }

}
