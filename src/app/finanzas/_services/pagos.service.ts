import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Pago } from '../_models/Pago';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class PagosService {

  constructor(private http: HttpClient) { }

  getPagos(): Observable<Pago[]> {
    return this.http.get(`${environment.apiBaseUrl}/pagos`).pipe(
      map((json: any) => {
        console.log('JSON CRUDO DEL BACK: ', json);
        return json.map(j => this.toPago(j));
      })
      // map((json: any) => json.map(j => this.toPago(j)))
    );
  }

  private toPago(json: any): Pago {
    const pago = new Pago();
    pago.fillFromJson(json);
    return pago;
  }

}