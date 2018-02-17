import { Clase } from '../../clases/models/clase';
import { Dia } from '../../clases/models/dia';
import { Rol } from '../../seguridad/_models/rol';

export class Usuario {

    id: number;
    email: string;
    nombre: string;
    apellido: string;
    domicilio: string;
    telefono: string;
    activo: boolean;
    rol: Rol;

    fillFromJson(json, opt?)  {
        this.id = json.id;
        this.email = json.email;
        this.nombre = json.nombre;
        this.apellido = json.apellido;
        this.domicilio = json.domicilio;
        this.telefono = json.telefono;
        this.activo = json.activo === 1;
    }
}
