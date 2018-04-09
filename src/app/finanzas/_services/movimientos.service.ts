import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movimiento } from '../_models/Movimiento';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class MovimientosService {

  constructor(private http: HttpClient) { }

  getOrFindLatest(mes: number, anio: number): Observable<Movimiento[]> {
    return this.http.get(`${environment.apiBaseUrl}/movimientos/${mes}/${anio}`)
      .pipe(map((json: any) => json.map(j => this.toMovimiento(j))));
  }

  store(mes: number, anio: number, movimientos: Movimiento[]): Observable<Movimiento[]> {
    return this.http.post(`${environment.apiBaseUrl}/movimientos/${mes}/${anio}`, {movimientos: movimientos})
      .pipe(
        map((json: any) => json.map(j => this.toMovimiento(j)))
      );
  }

  toMovimiento(json): Movimiento {
    const movimiento = new Movimiento();
    movimiento.fillFromJson(json);
    return movimiento;
  }

}
