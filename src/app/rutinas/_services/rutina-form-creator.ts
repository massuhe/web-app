import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

export class RutinaFormCreator {

    public static getDiaRutinaGroup(initialData: any = {}): FormGroup {
        return new FormGroup({
            id: new FormControl(initialData.id),
            series: new FormArray([])
        });
    }

    public static getSerieRutinaGroup(initialData: any = {}): FormGroup {
        return new FormGroup({
            id: new FormControl(initialData.id),
            vueltas: new FormControl(initialData.vueltas),
            macroDescanso: new FormControl(initialData.macroDescanso),
            observaciones: new FormControl(initialData.observaciones),
            semanaEspecificar: new FormControl(initialData.semanaEspecificar || 1),
            especificarPorSemana: new FormControl(initialData.especificarPorSemana || false),
            items: new FormArray([]),
        });
    }

    public static getItemSerieGroup(initialData: any = {}): FormGroup {
        return new FormGroup({
            id: new FormControl(initialData.id),
            ejercicio: new FormControl(initialData.ejercicio),
            microDescanso: new FormControl(initialData.microDescanso),
            observaciones: new FormControl(initialData.observaciones),
            nombreEjercicio: new FormControl(initialData.nombreEjercicio),
            parametrosSemana: new FormArray([])
        });
    }

    public static getParametrosSemanaGroup(initialData: any = {}): FormGroup {
        return new FormGroup({
            id: new FormControl(initialData.id),
            semana: new FormControl(initialData.semana),
            repeticiones: new FormControl(initialData.repeticiones)
        });
    }
}
