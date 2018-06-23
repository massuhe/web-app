import { Pago } from './Pago';

export class PagoCompleto extends Pago {

  apellido: string;
  nombre: string;
  mes: string;
  anio: string;
  fechaPago: any;
  totalCuota: string;

  fillFromJson(json: any): void {
    super.fillFromJson(json);
    this.apellido = json.cuota.alumno.usuario.apellido;
    this.nombre = json.cuota.alumno.usuario.nombre;
    this.mes = json.cuota.mes;
    this.anio = json.cuota.anio;
    this.fechaPago = json.created_at;
    this.totalCuota = json.cuota.importe_total;
  }

}
