import { Rutina } from '../_models/rutina';
import { Dia } from '../_models/Dia';
import { Serie } from '../_models/Serie';
import { ItemSerie } from '../_models/ItemSerie';
import { ParametroSemana } from '../_models/ParametroSemana';
import { Ejercicio } from '../../ejercicios/_models/Ejercicio';
import { ParametroItemSerie } from '../_models/ParametroItemSerie';
import { Clase } from '../../clases/models/clase';

export class RutinaBuilder {
  static build(json, clases: Clase[]) {
    const rutina = new Rutina();
    rutina.fillFromJson(json);
    const dias = this.buildDias(json.dias, clases);
    rutina.dias = dias;
    return rutina;
  }

  private static buildDias(diasJson, clases): Dia[] {
    const dias = [];
    // tslint:disable-next-line:prefer-const
    for (let diaJson of diasJson) {
      const dia = new Dia();
      dia.fillFromJson(diaJson);
      const series = this.buildSeries(diaJson.series, clases);
      dia.series = series;
      dias.push(dia);
    }
    return dias;
  }

  public static buildSeries(seriesJson, clases): Serie[] {
    const series = [];
    // tslint:disable-next-line:prefer-const
    for (let serieJson of seriesJson) {
      const serie = new Serie();
      serie.fillFromJson(serieJson);
      const items = this.buildItemsSerie(serieJson.items, clases);
      serie.items = items;
      series.push(serie);
    }
    return series;
  }

  public static buildItemsSerie(itemsJson, clases): ItemSerie[] {
    const items = [];
    // tslint:disable-next-line:prefer-const
    for (let itemJson of itemsJson) {
      const item = new ItemSerie();
      const ejercicio = new Ejercicio();
      ejercicio.fillFromJson(itemJson.ejercicio);
      item.ejercicio = ejercicio;
      item.fillFromJson(itemJson);
      const parametrosSemana = this.buildParametrosSemana(
        itemJson.parametros_semana,
        clases
      );
      item.parametrosSemana = parametrosSemana;
      items.push(item);
    }
    return items;
  }

  public static buildParametrosSemana(
    parametrosSemanaJson,
    clases
  ): ParametroSemana[] {
    const parametrosSemana = [];
    // tslint:disable-next-line:prefer-const
    for (let parametroSemanaJson of parametrosSemanaJson) {
      const parametroSemana = new ParametroSemana();
      parametroSemana.fillFromJson(parametroSemanaJson);
      const parametros = this.buildParametrosItemSerie(
        parametroSemanaJson.parametros,
        clases
      );
      parametroSemana.parametros = parametros;
      parametrosSemana.push(parametroSemana);
    }
    return parametrosSemana;
  }

  private static buildParametrosItemSerie(
    parametrosJson,
    clases
  ): ParametroItemSerie[] {
    const parametros = [];
    // tslint:disable-next-line:prefer-const
    for (let parametroJson of parametrosJson) {
      const parametro = new ParametroItemSerie();
      parametro.fillFromJson(parametroJson);
      const clase = clases.find(c => c.id === parametroJson.clase_especifica_id);
      parametro.clase = clase;
      parametros.push(parametro);
    }
    return parametros;
  }
}
