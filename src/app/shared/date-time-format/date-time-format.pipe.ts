import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe {

  transform(value: any, args: any = 'dd/MM/yyyy HH:mm'): any {
    return super.transform(value, args);
  }

}
