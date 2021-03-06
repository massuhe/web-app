import { ItemSerie } from './ItemSerie';

export class Serie {
    id: number;
    vueltas: string;
    macroDescanso: string;
    observaciones: string;
    items: ItemSerie[];

    fillFromJson(json: any): void {
        this.id = json.id;
        this.macroDescanso = json.macro_descanso;
        this.observaciones = json.observaciones;
        this.vueltas = json.vueltas;
    }
}
