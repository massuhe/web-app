import { Alumno } from '../../alumnos/models/alumno';
import * as subMinutes from 'date-fns/sub_minutes';
import * as parse from 'date-fns/parse';
import { MINUTOS_LIMITES_CONFIRMACION } from '../../app-constants';
import { Dia } from './dia';
import { Actividad } from '../../actividades/models/Actividad';

export class Clase {

    id: number;
    horaInicio: string;
    alumnos: any[];
    suspendida: boolean;
    motivo: string;
    disabled: boolean;
    lugaresDisponibles: number;
    incluyeAlumno: boolean;
    asiste: boolean;
    asistencias: {id: number, nombre: string, asistio: boolean}[];
    vencida: boolean;
    asistenciasFijas?: number;
    asistenciasSemanales?: number;
    estadoClaseFija?: string;
    fechaClaseFija?: Date;
    dia: Dia;

    constructor(props: Partial<Clase> = {}) {
        this.id = props.id;
        this.dia = props.dia;
        this.horaInicio = props.horaInicio;
        this.disabled = true;
        this.incluyeAlumno = false;
        this.vencida = false;
    }

    fillFromJson(json, paramsObj?) {
        this.id = json.id;
        this.horaInicio = json.hora_inicio;
        this.alumnos = json.alumnos;
        this.suspendida = json.suspendida;
        this.motivo = json.motivo;
        this.disabled = false;
        this.lugaresDisponibles = paramsObj && paramsObj.cantidadAlumnosPorClase - (json.alumnos.length || json.alumnos);
        this.asistenciasFijas = json.asistencia_fija;
        this.asistenciasSemanales = json.asistencia_semana;
    }

    fillFromJsonClaseEspecifica(json) {
        this.id = json.id;
        this.suspendida = json.suspendida;
        this.motivo = json.motivo;
        this.fechaClaseFija = json.fecha ? parse(json.fecha) : undefined;
        this.asistencias = json.alumnos && json.alumnos.map(a => ({
            id: a.id,
            nombre: `${a.usuario.nombre} ${a.usuario.apellido}`,
            asistio: !!+a.asistencia.asistio
        }));
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

    checkAsisteClase(clases) {
        if (clases.includes(this.id)) {
            this.asiste = true;
        } else {
            this.asiste = false;
        }
    }

    checkVencida(fecha: string) {
        if (this.disabled) {
            return;
        }
        const now = new Date();
        const hourArray = this.horaInicio.split(':');
        const fechaClase = parse(fecha);
        fechaClase.setHours(+hourArray[0]);
        fechaClase.setMinutes(+hourArray[1]);
        fechaClase.setSeconds(+hourArray[2]);
        const fechaClaseLimite = subMinutes(fechaClase, 60);
        if (now > fechaClaseLimite) {
            this.vencida = true;
        }
    }

    calculateEstadoClaseFija(cantidadMaximaAlumnos: number): void {
        if (cantidadMaximaAlumnos > this.asistenciasFijas && cantidadMaximaAlumnos > this.asistenciasSemanales) {
            this.estadoClaseFija = 'disponible';
            return ;
        }
        if (cantidadMaximaAlumnos <= this.asistenciasFijas) {
            this.estadoClaseFija = 'no-disponible';
            return ;
        }
        if (cantidadMaximaAlumnos <= this.asistenciasSemanales) {
            this.estadoClaseFija = 'semi-disponible';
            return ;
        }
    }
}
