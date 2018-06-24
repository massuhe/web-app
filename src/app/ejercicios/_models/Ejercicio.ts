import { TipoEjercicio } from './TipoEjercicio';

export class Ejercicio {
    id: number;
    nombre: string;
    descripcion: string;
    tipoEjercicio: TipoEjercicio | number;

    fillFromJson(json: any): void {
        this.id = json.id;
        this.descripcion = json.descripcion;
        this.nombre = json.nombre;
        this.tipoEjercicio = Number(json.tipo_ejercicio_id);
    }
}
