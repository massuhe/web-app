import { Pipe, PipeTransform } from '@angular/core';
import { MESES_ANIO } from '../../app-constants';

@Pipe({
  name: 'spanishMonth'
})
export class SpanishMonthPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return MESES_ANIO[value - 1];
  }

}
