import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ItemInventario } from '../_models/itemInventario';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HOLDER_PATH } from '../_constants/agregar-inventario';

@Injectable()
export class InventarioService {

  constructor(private http: HttpClient) { }

  getInventarios(): Observable<ItemInventario[]> {
    return this.http.get(`${environment.apiBaseUrl}/inventario`).pipe(
      map((json: any) => json.map(j => this.toItemInventario(j)))
    );
  }

  getById(idInventario: number): Observable<ItemInventario> {
    return this.http.get(`${environment.apiBaseUrl}/inventario/${idInventario}`).pipe(
      map((json: any) => this.toItemInventario(json))
    );
  }

  guardarInventario(json: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/inventario`, json).pipe(
      map((newJson: any) => this.toItemInventario(newJson))
    );
  }

  editarInventario(idInventario: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/inventario/${idInventario}`, data).pipe(
      map((newJson: any) => this.toItemInventario(newJson))
    );
  }

  eliminarInventario(idInventario: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/inventario/${idInventario}`);
  }

  private toItemInventario(json): ItemInventario {
    const item = new ItemInventario();
    item.fillFromJson(json);
    item.setImage(HOLDER_PATH);
    return item;
  }

}
