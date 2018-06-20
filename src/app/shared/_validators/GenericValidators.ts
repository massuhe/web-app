import { AbstractControl } from '@angular/forms';

export default class GenericValidators {

    static requiredIf(requiredControl: AbstractControl, requiredValue: any) {
        return (control: AbstractControl) => {
            if (requiredControl.value === requiredValue && !control.value) {
                return {'requiredIf': {value: control.value}};
            }
            return null;
        };
    }

    static greaterThanZero(control: AbstractControl) {
        const value = control.value;
        return value > 0 ? null : {'greaterThanZero': {value}};
    }

    static matchFields(fields: string[]) {
        return (control: AbstractControl) => {
            const match = fields.reduce((previous, current, index, array) => {
                if (index === 0) { return true; }
                const val1 = control.get(current).value;
                const val2 = control.get(array[index - 1]).value;
                return previous && (val1 === val2);
            }, true);
            return match ? null : {'matchFields': true};
        };
    }

}
