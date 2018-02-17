import { Permiso } from './permiso';

export class Rol {

    id: number;
    nombre: string;
    permisos: Permiso[];

    fillFromJson(json) {
        this.id = json.id;
        this.nombre = json.nombre;
    }
}
