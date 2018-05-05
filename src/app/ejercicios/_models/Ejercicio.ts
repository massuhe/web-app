export class Ejercicio {
    id: number;
    nombre: string;

    fillFromJson(json: any): void {
        this.id = json.id;
        this.nombre = json.nombre;
    }
}
