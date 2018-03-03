import { Clase } from '../../clases/models/clase';
import { Dia } from '../../clases/models/dia';
import { Usuario } from '../../usuarios/_models/Usuario';

export class Alumno extends Usuario {

    tieneAntecDeportivos: boolean;
    observacionesAntecDeportivos: string;
    tieneAntecMedicos: boolean;
    observacionesAntecMedicos: string;
    clases: Clase[];

    fillFromJson(json, opt?)  {
        this.id = opt.useAlumnoId ? json.alumno.id : json.id;
        this.email = json.email;
        this.nombre = json.nombre;
        this.apellido = json.apellido;
        this.domicilio = json.domicilio;
        this.telefono = json.telefono;
        this.tieneAntecDeportivos = json.alumno ? json.alumno.tiene_antec_deportivos === 1 : undefined;
        this.observacionesAntecDeportivos = json.alumno ? json.alumno.observaciones_antec_deportivos : '';
        this.tieneAntecMedicos = json.alumno ? json.alumno.tiene_antec_medicos === 1 : undefined;
        this.observacionesAntecMedicos = json.alumno ? json.alumno.observaciones_antec_medicos : '';
        this.activo = json.activo === 1;
        this.clases = json.alumno && json.alumno.clases ? this.mapClases(json.alumno.clases) : undefined;
    }

    mapClases(clases): Clase[] {
        return clases.map(claseJson => {
            const c = new Clase();
            c.fillFromJson(claseJson);
            const dia = new Dia();
            dia.fillFromJson(claseJson);
            c.dia = dia;
            return c;
        });
    }

    get fullName(): string {
        return `${this.nombre} ${this.apellido}`;
    }
}
