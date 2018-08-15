import { Injectable } from '@angular/core';
import { Novedad } from '../_models/Novedad';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { IQueryParam } from '../../shared/_interfaces/IQueryParam';
import { SerializeService } from '../../core/serialize.service';

@Injectable()
export class NovedadService {

  constructor(private http: HttpClient, private serializeService: SerializeService) { }

  getNovedades(queryParams?: IQueryParam): Observable<Novedad[]> {
    const filters = queryParams ? this.serializeService.serialize(queryParams) : '';
    const url = `${environment.apiBaseUrl}/novedades?${filters}`;
    return this.http.get(url).pipe(
      map((json: any) => json.map(j => this.toNovedad(j)))
    );
  }


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
