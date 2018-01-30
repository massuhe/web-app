import DiaActividad from './DiaActividad';
import { Dia } from '../../clases/models/dia';

export class Actividad {

    id: number;
    nombre: string;
    descripcion?: string;
    duracion: number;
    cantidadAlumnosPorClase: number;
    horaMinima?: number;
    horaMaxima?: number;
    totalAlumnos?: number;
    diasHorarios: DiaActividad[];
    diasClases?: Dia[];

    constructor(props: Partial<Actividad> = {}) {
        this.diasHorarios = props.diasHorarios || [];
        this.nombre = props.nombre;
    }

    fillFromJson?(json) {
        this.id = json.id;
        this.diasClases = json.dias_clases;
        this.nombre = json.nombre;
        this.descripcion = json.descripcion;
        this.duracion = json.duracion;
        this.cantidadAlumnosPorClase = json.cantidad_alumnos_por_clase;
        this.horaMinima = json.hora_minima;
        this.horaMaxima = json.hora_maxima;
        this.totalAlumnos = json.total_alumnos;
        this.diasHorarios = json.dias_horarios ? json.dias_horarios.map(dh => {
            const diaHorario = new DiaActividad();
            diaHorario.fillFromJson(dh);
            return diaHorario;
        }) : [];
    }

}
