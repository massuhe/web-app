import { TipoEjercicio } from './TipoEjercicio';

export class Ejercicio {
    id: number;
    nombre: string;
    tipoEjercicio: TipoEjercicio;

    fillFromJson(json: any): void {
        this.id = json.id;
        this.nombre = json.nombre;
    }
}
