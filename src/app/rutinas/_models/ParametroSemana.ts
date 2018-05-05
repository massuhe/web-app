import { ParametroItemSerie } from './ParametroItemSerie';

export class ParametroSemana {
    id: number;
    semana: number;
    repeticiones: string;
    parametros: ParametroItemSerie[];

    constructor() {
        this.parametros = [];
    }

    fillFromJson(json: any): void {
        this.id = json.id;
        this.semana = json.semana;
        this.repeticiones = json.repeticiones;
    }
}
