import { Rutina } from '../_models/rutina';
import { Clase } from '../../clases/models/clase';

export interface IGetRutina {
    rutina: Rutina;
    alumno: string;
    ultimaSemana?: number;
    clases: Clase[];
}
