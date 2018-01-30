import { Clase } from './clase';
import { Actividad } from '../../actividades/models/Actividad';

export class Dia {

    fecha: Date;
    clases: Clase[];
    diaSemana: string;
    actividad: Actividad;

    constructor(props: Partial<Dia> = {}) {
        this.fecha = props.fecha;
        this.diaSemana = props.diaSemana;
        this.actividad = props.actividad;
    }

    fillFromJson(json, paramsObj?) {
        this.diaSemana = json.dia_semana;
        this.fecha = json.fecha;
        const clasesArray = [];
        // tslint:disable-next-line:no-unused-expression
        paramsObj && paramsObj.horas.forEach( h => {
            const claseJson = json.clases.find(c => c.hora_inicio === h);
            const clase = new Clase();
            if (claseJson) {
                clase.fillFromJson(claseJson, {cantidadAlumnosPorClase: paramsObj.cantidadAlumnosPorClase});
            }
            clasesArray.push(clase);
        });
        this.clases = clasesArray;
    }

}
