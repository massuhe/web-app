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

}
