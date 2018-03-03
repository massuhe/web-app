import { Pago } from './Pago';
import { Alumno } from '../../alumnos/models/alumno';

export class Cuota {

    id: number;
    mes: number;
    anio: number;
    pagos: Pago[];
    importeTotal: number;
    observaciones: string;
    alumno: Alumno;

    fillFromJson(json: any): void {
        this.id = json.id || 0;
        this.mes = json.mes;
        this.anio = json.anio;
        this.importeTotal = json.importe_total;
        this.observaciones = json.observaciones;
    }

}
