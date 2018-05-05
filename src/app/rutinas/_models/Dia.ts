import { Serie } from './Serie';

export class Dia {
    id: number;
    series: Serie[];

    fillFromJson(json: any): void {
        this.id = json.id;
    }
}
