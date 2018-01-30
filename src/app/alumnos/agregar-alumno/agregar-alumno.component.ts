import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlumnosService} from '../services/alumnos.service';
import {ValidacionService} from '../../core/validacion.service';
import {ESTRUCTURA_AGREGAR_ALUMNO, MENSAJES_AGREGAR_ALUMNO} from '../_constants/agregar-alumno';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Clase } from '../../clases/models/clase';

@Component({
    selector: 'app-agregar-alumno',
    templateUrl: './agregar-alumno.component.html',
    styleUrls: ['./agregar-alumno.component.scss',
        '../../../assets/scss/components/_buttons.scss'],
    providers: [
        AlumnosService,
        ValidacionService
    ]
})
export class AgregarAlumnoComponent implements OnInit, OnDestroy {

    form: FormGroup;
    cargando = false;
    errors: any;
    $destroy: Subject<boolean>;
    clases: Clase[];

    constructor (
        private formBuilder: FormBuilder,
        private alumnosService: AlumnosService,
        private validacionService: ValidacionService
    ) {
    }

    ngOnInit() {
        this.clases = [];
        this.createForm();
        this.initializeValidationService();
        this.subscribeToValueChanges();
    }

    createForm() {
        this.form = this.formBuilder.group({
            'email': ['', { updateOn: 'blur', validators: [Validators.required, Validators.email] }],
            'nombre': ['', { updateOn: 'blur', validators: [Validators.required] }],
            'apellido': ['', { updateOn: 'blur', validators: [Validators.required] }],
            'domicilio': ['', { updateOn: 'blur', validators: [Validators.required] }],
            'tieneAntecDeportivos': [false],
            'observacionesAntecDeportivos': [{value: '', disabled: true}],
            'telefono': ['', { updateOn: 'blur', validators: [Validators.required, Validators.pattern(/^\d+$/)] }],
            'tieneAntecMedicos': [false],
            'observacionesAntecMedicos': [{value: '', disabled: true}]
        });
    }

    handleSubmit() {
        if (this.form.valid) {
            const value = {...this.form.getRawValue(), clases: this.clases.map(c => c.id)};
            console.log(value);
        } else {
            this.validacionService.showErrors(this.form);
        }
    }

    handleSelectClase(clase: Clase) {
        const existeClase = !!this.clases.find(c => clase.id === c.id);
        if (!existeClase) {
            this.clases = [...this.clases, clase];
        }
    }

    handleDeleteClase(indexDelete: number) {
        this.clases = [...this.clases.slice(0, indexDelete), ...this.clases.slice(indexDelete + 1)];
    }

    private initializeValidationService() {
        this.validacionService.inicializa(ESTRUCTURA_AGREGAR_ALUMNO, MENSAJES_AGREGAR_ALUMNO);
        this.validacionService.getErrorsObservable(this.form)
          .subscribe(newErrors => {
            this.errors = newErrors;
        });
    }

    private subscribeToValueChanges(): void {
        this.$destroy = new Subject<boolean>();
        this.form.get('tieneAntecDeportivos').valueChanges.takeUntil(this.$destroy).subscribe(val => {
          this.enableOrDisable(val, 'observacionesAntecDeportivos', false);
        });
        this.form.get('tieneAntecMedicos').valueChanges.takeUntil(this.$destroy).subscribe(val => {
          this.enableOrDisable(val, 'observacionesAntecMedicos', false);
        });
      }

      enableOrDisable(val, formName, disableValue): void {
        if (val === disableValue) {
          this.form.controls[formName].disable();
          this.form.patchValue({[formName]: ''});
        } else {
          this.form.controls[formName].enable();
        }
    }

    ngOnDestroy() {
        this.$destroy.next(true);
        this.$destroy.unsubscribe();
    }
}
