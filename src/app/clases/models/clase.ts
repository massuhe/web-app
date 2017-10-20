import { Alumno } from '../../alumnos/models/alumno';

export class Clase {

    id: number;
    horaInicio: string;
    alumnos: any[];
    suspendida: boolean;
    motivo: string;
    disabled: boolean;
    lugaresDisponibles: number;
    incluyeAlumno: boolean;

    constructor() {
        this.disabled = true;
        this.incluyeAlumno = false;
    }

    fillFromJson(json, paramsObj) {
        this.id = json.id;
        this.horaInicio = json.horaInicio;
        this.alumnos = json.alumnos;
        this.suspendida = json.suspendida;
        this.motivo = json.motivo;
        this.disabled = false;
        this.lugaresDisponibles = paramsObj.cantidadAlumnosPorClase - json.alumnos.length;
    }

    checkIncluyeAlumno(text) {
        if (text === '' || text === ' ' || !this.alumnos) {
            this.incluyeAlumno = false;
            return;
        }
        let included = false;
        this.alumnos.forEach( a => {
            const fullName = `${a.nombre} ${a.apellido}`.toUpperCase();
            const upperText = text.toUpperCase();
            if (fullName.includes(upperText)) {
                included = true;
            }
        });
        this.incluyeAlumno = included;
    }
}
