export class Permiso {

    id: number;
    nombre: string;

    fillFromJson(json) {
        this.id = json.id;
        this.nombre = json.nombre;
    }
}
