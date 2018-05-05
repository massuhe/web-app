import { Injectable } from '@angular/core';
import { RUTINA_JSON } from './rutina-mock';
import { Observable } from 'rxjs/Observable';
import { Rutina } from '../_models/rutina';
import { Dia } from '../_models/dia';
import { Serie } from '../_models/Serie';
import { ItemSerie } from '../_models/ItemSerie';
import { RutinaBuilder } from './rutina-builder';

@Injectable()
export class RutinaService {

  constructor() {}

  getRutina(): Observable<{rutina: Rutina, ultimaSemana?: number}> {
    return this.fakeCall()
      .map(json => ({
        rutina: this.toRutina(json.rutina),
        ultimaSemana: Number(json.ultima_semana)
      }));
  }

  private fakeCall(): Observable<any> {
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(RUTINA_JSON);
        observer.complete();
      }, 500);
    });
  }

  private toRutina(json: any): Rutina {
    const rutina = RutinaBuilder.build(json);
    return rutina;
  }

}
