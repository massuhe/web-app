import { Injectable } from '@angular/core';
import { Novedad } from '../_models/Novedad';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class NovedadService {

  getNovedades(): Observable<Novedad[]> {
    const url = `${environment.apiBaseUrl}/novedades`;
    return this.http.get(url).pipe(
      map((json: any) => json.map(j => this.toNovedad(j)))
    );
  }

  constructor(private http: HttpClient) { }

  guardarNovedad(data): Observable<Novedad> {
    const url = `${environment.apiBaseUrl}/novedades`;
    return this.http.post(url, data).pipe(
      map(novedadJson => this.toNovedad(novedadJson))
    );
  }

  editarNovedad(idNovedad: number, data): Observable<Novedad> {
    const url = `${environment.apiBaseUrl}/novedades/${idNovedad}`;
    return this.http.put(url, data).pipe(
      map(novedadJson => this.toNovedad(novedadJson))
    );
  }

  eliminarNovedad(idNovedad: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/novedades/${idNovedad}`;
    return this.http.delete(url);
  }

  private toNovedad(novedadJson): Novedad {
    const novedad = new Novedad();
    novedad.fillFromJson(novedadJson);
    return novedad;
  }

}
