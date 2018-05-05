import { ParametroSemana } from './ParametroSemana';
import { Ejercicio } from '../../ejercicios/_models/Ejercicio';

export class ItemSerie {
    id: number;
    microDescanso: string;
    observaciones: string;
    ejercicio: Ejercicio;
    parametrosSemana: ParametroSemana[];

    fillFromJson(json: any): void {
        this.id = json.id;
        this.microDescanso = json.microDescanso;
        this.observaciones = json.observaciones;
    }
}
