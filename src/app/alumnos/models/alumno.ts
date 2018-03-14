import { Clase } from '../../clases/models/clase';
import { Dia } from '../../clases/models/dia';
import { Usuario } from '../../usuarios/_models/Usuario';
import { IDeuda } from '../_interfaces/IDeuda';

export class Alumno extends Usuario {

    usuarioId: number;
    tieneAntecDeportivos: boolean;
    observacionesAntecDeportivos: string;
    tieneAntecMedicos: boolean;
    observacionesAntecMedicos: string;
    clases: Clase[];
    deudas?: IDeuda[];

    fillFromJson(json)  {
        this.id = json.alumno.id;
        this.usuarioId = json.id;
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
        this.deudas = json.debe ? json.debe.map(
            d => ({anio: Number(d.anio), mes: Number(d.mes), debe: Number(d.debe)})
        ) : undefined;
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
