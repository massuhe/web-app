export class Pago {

    importe: number;
    fechaPago: Date;

    fillFromJson(json: any): void {
        this.importe = json.importe;
        this.fechaPago = json.created_at ? new Date(json.created_at) : undefined;
    }

}
