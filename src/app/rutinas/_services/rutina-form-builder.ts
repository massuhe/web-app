import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Rutina } from '../_models/rutina';
import { Dia } from '../_models/Dia';
import { RutinaFormCreator } from './rutina-form-creator';
import { Serie } from '../_models/Serie';
import { ItemSerie } from '../_models/ItemSerie';
import { ParametroSemana } from '../_models/ParametroSemana';

export class RutinaFormBuilder {
  public static buildForm(rutina: Rutina): FormGroup {
    return new FormGroup({
      id: new FormControl(rutina.id),
      fechaInicio: new FormControl(rutina.fechaInicio),
      totalSemanas: new FormControl(rutina.totalSemanas),
      dias: this.buildDiasForm(rutina.dias)
    });
  }

  private static buildDiasForm(dias: Dia[]): FormArray {
    return new FormArray(
      dias.map(d => {
        const group = RutinaFormCreator.getDiaRutinaGroup(d);
        group.setControl('series', this.buildSeriesForm(d.series));
        return group;
      })
    );
  }

  private static buildSeriesForm(series: Serie[]): FormArray {
    return new FormArray(
      series.map(s => {
        const serieRutinaValue = {
          ...s,
          especificarPorSemana: this.shouldEspecificarPorSemana(s.items)
        };
        const group = RutinaFormCreator.getSerieRutinaGroup(serieRutinaValue);
        group.setControl('items', this.buildItemsForm(s.items));
        return group;
      })
    );
  }

  private static buildItemsForm(items: ItemSerie[]): FormArray {
    return new FormArray(
      items.map(i => {
        const group = RutinaFormCreator.getItemSerieGroup({
          ...i,
          ejercicio: i.ejercicio.id,
          nombreEjercicio: i.ejercicio.nombre
        });
        group.setControl(
          'parametrosSemana',
          this.buildParametrosSemanaForm(i.parametrosSemana)
        );
        return group;
      })
    );
  }

  private static buildParametrosSemanaForm(
    parametrosSemana: ParametroSemana[]
  ): FormArray {
    return new FormArray(
      parametrosSemana.map(ps => {
        const group = RutinaFormCreator.getParametrosSemanaGroup(ps);
        return group;
      })
    );
  }

  private static shouldEspecificarPorSemana(items: ItemSerie[]): boolean {
    return !items.reduce(
      (prev: boolean, current: ItemSerie) =>
        prev && this.areAllParametrosIguales(current.parametrosSemana),
      true
    );
  }

  private static areAllParametrosIguales(
    parametros: ParametroSemana[]
  ): boolean {
    return parametros.reduce(
      (
        prev: boolean,
        current: ParametroSemana,
        index: number,
        arr: ParametroSemana[]
      ) => {
        if (index === 0) {
          return true;
        }
        return prev && current.repeticiones === arr[index - 1].repeticiones;
      },
      true
    );
  }
}
