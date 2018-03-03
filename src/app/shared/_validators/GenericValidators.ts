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

}
