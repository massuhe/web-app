import { Clase } from './clase';

export class Dia {

    fecha: Date;
    clases: Clase[];

    fillFromJson(json, paramsObj) {
        this.fecha = json.fecha;
        const clasesArray = [];
        paramsObj.horas.forEach( h => {
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
