import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ValidacionService {
    private estructuraSubject;
    private estructura;
    private mensajes;

    constructor() {
        this.estructuraSubject = new Subject();
    }

    inicializa(estructura, mensajes) {
        this.estructura = estructura;
        this.mensajes = mensajes;
    }

    getEstructura() {
        return this.estructuraSubject.asObservable();
    }

    verificarCampos(formulario: FormGroup) {
        for (const campo of Object.keys(formulario.controls)) {
            const control = formulario.get(campo);
            if (control instanceof FormGroup) {
                this.verificarCampos(control);
            } else {
                this.estructura[campo] = '';
                if (control && control.dirty && !control.valid) {
                    const mensajes = this.mensajes[campo];
                    for (const key of Object.keys(control.errors)) {
                        this.estructura[campo] += mensajes[key] + ' ';
                    }
                }
            }
        }
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsDirty();
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
}
