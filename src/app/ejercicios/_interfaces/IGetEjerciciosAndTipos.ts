import { Ejercicio } from '../_models/Ejercicio';
import { TipoEjercicio } from '../_models/TipoEjercicio';

export interface IGetEjerciciosAndTipos {
    tipos: TipoEjercicio[];
    ejercicios: Ejercicio[];
}
