import { Injectable } from '@angular/core';
import { Novedad } from '../_models/Novedad';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { IQueryParam } from '../../shared/_interfaces/IQueryParam';
import { SerializeService } from '../../core/serialize.service';
import { IResponseHeaders } from '../../shared/_interfaces/IResponseHeaders';

@Injectable()
export class NovedadService {

  constructor(private http: HttpClient, private serializeService: SerializeService) { }

  getNovedades(queryParams?: IQueryParam, responseHeaders?: IResponseHeaders): Observable<Novedad[] | any> {
    const filters = queryParams ? this.serializeService.serialize(queryParams) : '';
    const url = `${environment.apiBaseUrl}/novedades?${filters}`;
    return this.http
      .get(url, {observe: 'response', headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(
        map((json: any) => this.processResponse(json, responseHeaders))
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

  private processResponse(response, responseHeaders): any {
    const data = response.body.map(j => this.toNovedad(j));
    if (!responseHeaders) {
      return data;
    }
    return {data, ...this.buildResponseWithHeadersData(response, responseHeaders)};
  }

  private buildResponseWithHeadersData(response, responseHeaders: IResponseHeaders): any {
    const responseObj = {};
    if (responseHeaders.totalCount) {
      responseObj['count'] = Number(response.headers.get('X-Total-Count'));
    }
    return responseObj;
  }

  private toNovedad(novedadJson): Novedad {
    const novedad = new Novedad();
    novedad.fillFromJson(novedadJson);
    return novedad;
  }

}
