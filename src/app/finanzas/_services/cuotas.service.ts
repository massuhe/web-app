import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SerializeService } from '../../core/serialize.service';
import { Cuota } from '../_models/Cuota';
import { map } from 'rxjs/operators';
import { Pago } from '../_models/Pago';

@Injectable()
export class CuotasService {
  constructor(
    private http: HttpClient,
    private serializeService: SerializeService
  ) {}

  public get(alumno?: number, mes?: number, anio?: number): Observable<Cuota | Cuota[]> {
    const endpoint = [];
    if (alumno) { endpoint.push(alumno); }
    if (mes) { endpoint.push(mes); }
    if (anio) { endpoint.push(anio); }
    const query = endpoint.join('/');
    return this.http
      .get(`${environment.apiBaseUrl}/cuota/${query}`)
      .pipe(
        map(json => json instanceof Array ?
          json.map(j => this.toCuota(j))
          : this.toCuota(json))
      );
  }

  public registrarPago(value: any) {
    return this.http.post(`${environment.apiBaseUrl}/cuota`, value)
      .pipe(map(json => this.toCuota(json)));
  }

  private toCuota(cuotaJson: any): Cuota {
    const cuota = new Cuota();
    cuota.fillFromJson(cuotaJson);
    const pagos = cuotaJson.pagos && cuotaJson.pagos.map(p => {
      const pago = new Pago();
      pago.fillFromJson(p);
      return pago;
    });
    cuota.pagos = pagos;
    return cuota;
  }
}
