export class Actividad {

    id: number;
    nombre: string;
    descripcion?: string;
    duracion: number;
    cantidadAlumnosPorClase: number;
    horaMinima?: number;
    horaMaxima?: number;

    fillFromJson(json) {
        this.id = json.id;
        this.nombre = json.nombre;
        this.descripcion = json.descripcion;
        this.duracion = json.duracion;
        this.cantidadAlumnosPorClase = json.cantidad_alumnos_por_clase;
        this.horaMinima = json.hora_minima;
        this.horaMaxima = json.hora_maxima;
    }

}
