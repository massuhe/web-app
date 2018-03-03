export class Pago {

    importe: number;

    fillFromJson(json: any): void {
        this.importe = json.importe;
    }

}
