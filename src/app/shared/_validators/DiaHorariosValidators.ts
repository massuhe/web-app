import { AbstractControl, FormArray } from '@angular/forms';
import { DIAS_SEMANA } from '../../actividades/constants';

export default class DiaHorariosValidators {

    static diaRepetidoValidator(arr: any[]) {
        return (control: AbstractControl) => {
            const dia = DIAS_SEMANA[+control.value];
            const included = arr.map(e => e.toUpperCase()).includes(dia.toUpperCase());
            return included ? {'alreadyIncluded': {value: dia}} : null;
        };
    }

    static tieneHorarios(control: AbstractControl) {
        const diasHorarios = control.get('horarios') as FormArray;
        return diasHorarios.controls.length === 0 ? {'emptyHorarios': {value: 'DiasHorarios'}} : null;
    }
}
