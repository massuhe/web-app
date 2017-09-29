export class Alumno {

    id: number;
    email: string;
    nombre: string;
    apellido: string;
    domicilio: string;
    telefono: string;
    observaciones: string;
    activo: boolean;
    tieneAntecDeportivos: boolean;

    fillFromJson(json)  {
        this.id = json.id;
        this.email = json.email;
        this.nombre = json.nombre;
        this.apellido = json.apellido;
        this.domicilio = json.domicilio;
        this.telefono = json.telefono;
        this.observaciones = json.observaciones;
        this.activo = json.activo === 1;
        this.tieneAntecDeportivos = json.alumno ? json.alumno.tiene_antec_deportivos === 1 : undefined;
    }
}
