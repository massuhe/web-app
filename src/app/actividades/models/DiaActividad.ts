import RangoHorario from './RangoHorario';

class DiaActividad {
    diaSemana: string;
    horarios: RangoHorario[];

    fillFromJson(json) {
        this.diaSemana = json.dia_semana;
        this.horarios = json.horarios ? json.horarios.map(h => {
            const horario = new RangoHorario();
            horario.fillFromJson(h);
            return horario;
        }) : [];
    }
}

export default DiaActividad;
