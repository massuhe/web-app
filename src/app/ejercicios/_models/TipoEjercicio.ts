import { Ejercicio } from './Ejercicio';

export class TipoEjercicio {
    id: number;
    nombre: string;
    ejercicios: Ejercicio[];

    fillFromJson(data): void {
        this.id = data.id;
        this.nombre = data.nombre;
    }
}
