import { TipoMovimiento } from './TipoMovimiento';

export class Movimiento {
    id: number;
    descripcion: string;
    importe: number;
    tipoMovimiento: TipoMovimiento;
    fechaEfectiva: Date;
    esPersonal: boolean;
    mes: number;
    anio: number;

    constructor() {
        this.fechaEfectiva = null;
    }

    fillFromJson(json: any): void {
        this.id = json.id;
        this.descripcion = json.descripcion;
        this.importe = json.importe;
        this.tipoMovimiento = json.tipo_movimiento;
        this.fechaEfectiva = json.fecha_efectiva ? new Date(json.fecha_efectiva) : null;
        this.esPersonal = json.es_personal !== undefined && Boolean(json.es_personal);
        this.mes = json.mes;
        this.anio = json.anio;
    }

    clone(): Movimiento {
        const clon = new Movimiento();
        clon.id = this.id;
        clon.descripcion = this.descripcion;
        clon.importe = this.importe;
        clon.tipoMovimiento = this.tipoMovimiento;
        clon.fechaEfectiva = this.fechaEfectiva;
        clon.esPersonal = this.esPersonal;
        clon.mes = this.mes;
        clon.anio = this.anio;
        return clon;
    }
}
