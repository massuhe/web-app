import { Clase } from '../../clases/models/clase';

export class ParametroItemSerie {
    id: number;
    carga: string;
    clase: Clase;

    fillFromJson(json: any): void {
        this.id = json.id;
        this.carga = json.carga;
    }
}
