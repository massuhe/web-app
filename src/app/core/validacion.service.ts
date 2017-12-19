import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, AbstractControl, FormArray } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ValidacionService {
    private estructuraSubject;
    private estructura;
    private mensajes;
    private errorsSubject;
    private subscriptions;
    public errors;

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

    getErrorsObservable(form: FormGroup) {
        const err = this.errors = this.initErrors(form);
        this.errorsSubject = new BehaviorSubject<any>(err);
        const controls = Object.keys(form.controls).map(cKey => ({ key: cKey, control: form.get(cKey) }));
        this.subscriptions = controls.map((c: { key: string, control: AbstractControl }) =>
            c.control.statusChanges.subscribe(_ => {
                this.errors[c.key] = this.checkErrors(c.key, c.control.errors);
                this.errorsSubject.next({ ...this.errors });
            }));
        return this.errorsSubject.asObservable();
    }

    initErrors(form: AbstractControl) {
        return Object.keys((<FormGroup>form).controls).reduce((pv: any, cv: any) => {
            const currVal = form.get(cv);
            if (currVal instanceof FormControl) {
                return {...pv, [cv]: []};
            } else if (currVal instanceof FormGroup) {
                return {...pv, [cv]: this.initErrors(currVal)};
            } else if (currVal instanceof FormArray) {
                return {...pv, [cv]: currVal.controls.map(c => c instanceof FormControl ? [] : this.initErrors(c))};
            }
        }, {});
    }

    showErrors(form: FormGroup) {
        const controls = Object.keys(form.controls).map(c => form.get(c));
        controls.forEach(con => {
            this.markIfDirty(con);
        });
    }

    private checkErrors(fieldKey: string, errors: ValidationErrors) {
        return errors ? Object.keys(errors).map(e => this.mensajes[fieldKey][e]) : [];
    }

    private markIfDirty(control: AbstractControl) {
        control.markAsDirty();
        if (control instanceof FormControl) {
            control.updateValueAndValidity();
        } else if (control instanceof FormArray) {
            control.controls.forEach(controlGroup => this.markIfDirty(controlGroup));
        } else if (control instanceof FormGroup) {
            Object.keys(control.controls).map(c => control.get(c)).forEach(con => this.markIfDirty(con));
        }
    }

}
