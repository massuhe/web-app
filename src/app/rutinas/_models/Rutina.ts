import { Dia } from './Dia';
import * as parse from 'date-fns/parse';

export class Rutina {
    id: number;
    numero: number;
    fechaInicio: Date;
    fechaFin: Date;
    totalSemanas: number;
    dias: Dia[];

    fillFromJson(json: any): void {
        this.id = json.id;
        this.numero = json.numero_rutina;
        this.fechaInicio = this.parseDate(json.fecha_inicio);
        this.fechaFin = this.parseDate(json.fecha_fin);
        this.totalSemanas = json.total_semanas;
    }

    private parseDate(fechaJson): Date {
        if (!fechaJson) {
            return ;
        }
        return fechaJson instanceof Object ?
            parse(fechaJson.date)
            : parse(fechaJson);
    }
}
