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
        this.fechaInicio = json.fecha_inicio ? parse(json.fecha_inicio) : undefined;
        this.fechaFin = json.fecha_fin ? parse(json.fecha_fin) : undefined;
        this.totalSemanas = json.total_semanas;
    }
}
