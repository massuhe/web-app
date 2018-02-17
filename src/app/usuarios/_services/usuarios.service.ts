import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SerializeService } from '../../core/serialize.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../_models/Usuario';
import { Rol } from '../../seguridad/_models/rol';

@Injectable()
export class UsuariosService {

  constructor(
    private http: HttpClient,
    private serializeService: SerializeService
  ) { }

  getUsuarios(): Observable<Usuario[]> {
    const f = this.getFilterGroups();
    return this.http
      .get(
        `${environment.apiBaseUrl}/usuarios?${this.serializeService.serialize(f)}`
      )
      .pipe(map((us: any) => us.map(u => this.toUsuario(u))));
  }

  guardarUsuario(userData: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/usuarios`, userData);
  }

  editarUsuario(idUsuario: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/usuarios/${idUsuario}`, data);
  }

  getById(idUsuario: number): Observable<Usuario> {
    const url = `${environment.apiBaseUrl}/usuarios/${idUsuario}?includes[]=rol`;
    return this.http.get(url).pipe(map(json => this.toUsuario(json)));
  }

  borrarUsuario(idUsuario: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/usuarios/${idUsuario}`);
  }

  protected getFilterGroups(search?) {
    const f = {
      includes: ['rol'],
      filter_groups: [
        {
          filters: [
            { key: 'isAlumno', value: false, operator: 'eq' }
          ]
        }
      ]
    };
    return f;
  }

  protected toUsuario(usuarioJson): Usuario {
    const usuario = new Usuario();
    usuario.fillFromJson(usuarioJson);
    if (usuarioJson.rol) {
      const rol = new Rol();
      rol.fillFromJson(usuarioJson.rol);
      usuario.rol = rol;
    }
    return usuario;
  }

}
