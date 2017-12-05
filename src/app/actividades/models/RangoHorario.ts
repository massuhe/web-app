class RangoHorario {
    horaDesde: string;
    horaHasta: string;

    fillFromJson(json) {
        this.horaDesde = json.hora_desde;
        this.horaHasta = json.hora_hasta;
    }
}

export default RangoHorario;
