export class ClaseEspecifica {

    id: number;
    // fecha: Date;
    suspendida: boolean;
    motivo: string;
    asistencias: {id: number, nombre: string, asistio: boolean}[];

    fillFromJson(json) {
        this.id = json.id;
        this.suspendida = json.suspenida;
        this.motivo = json.motivo;
        this.asistencias = json.alumnos.map(a => ({
            id: a.id,
            nombre: `${a.usuario.nombre} ${a.usuario.apellido}`,
            asistio: a.asistencia.asistio
        }));
    }

}
