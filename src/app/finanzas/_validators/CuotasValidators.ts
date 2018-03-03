import { AbstractControl } from '@angular/forms';

export default class CuotasValidators {

    static debeNotNegative(form: AbstractControl): Promise<any> {
        return new Promise((resolve, reject) => {
            // const importeTotal = form.get('importeTotal').value;
            const debe = form.get('debe').value;
            // const importePaga = form.get('importePaga').value;
            // const value = debe - importePaga;
            setTimeout(_ => debe < 0 ? resolve({debeNotNegative: {debe}}) : resolve(null));
        });
    }

}
