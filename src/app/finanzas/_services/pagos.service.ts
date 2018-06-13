import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Pago } from '../_models/Pago';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PagoCompleto } from '../_models/PagoCompleto';
import { IFiltroCuotaMes } from '../_interfaces/IFiltroCuotaMes';
import { IFiltroAlumnoFechas } from '../_interfaces/IFiltroAlumnoFechas';
import * as format from 'date-fns/format';

@Injectable()
export class PagosService {

  constructor(private http: HttpClient) { }
  
  getPagosByMesCuota(filtroCuotaMes : IFiltroCuotaMes): Observable<PagoCompleto[]> {
    const mes = filtroCuotaMes.mes;
    const anio = filtroCuotaMes.anio;
    return this.http.get(`${environment.apiBaseUrl}/pagos/cuota/${mes}/${anio}`).pipe(
      map((json: any) => json.map(j => this.toPagoCompleto(j)))
    );
  }

  getPagosByAlumnoYFechas(filtroAlumnoFechas : IFiltroAlumnoFechas): Observable<PagoCompleto[]> {
    let params = new HttpParams();
    params = filtroAlumnoFechas.fechaDesde ? params.append('fechaDesde', format(filtroAlumnoFechas.fechaDesde, 'YYYY-MM-DD')) : params;
    params = filtroAlumnoFechas.fechaHasta ? params.append('fechaHasta', format(filtroAlumnoFechas.fechaHasta, 'YYYY-MM-DD')) : params;
    params = filtroAlumnoFechas.idAlumno ? params.append('idAlumno', filtroAlumnoFechas.idAlumno.toString()) : params;
    return this.http.get(`${environment.apiBaseUrl}/pagos/searchAlumnoFechas`, { params: params }).pipe(
      map((json: any) => json.map(j => this.toPagoCompleto(j)))
    );
  }
  
  private toPagoCompleto(json: any): PagoCompleto {
    const pago = new PagoCompleto();
    pago.fillFromJson(json);
    return pago;
  }

}