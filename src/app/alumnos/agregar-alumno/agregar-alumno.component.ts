import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlumnosService} from '../services/alumnos.service';
import {ValidacionService} from '../../core/validacion.service';
import {ESTRUCTURA_AGREGAR_ALUMNO, MENSAJES_AGREGAR_ALUMNO} from '../_constants/agregar-alumno';
import { Subscription } from 'rxjs/Subscription';

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
    subscriptions: Subscription[] = [];

    constructor (
        private formBuilder: FormBuilder,
        private alumnosService: AlumnosService,
        private validacionService: ValidacionService
    ) {
    }

    ngOnInit() {
        this.createForm();
        this.initializeValidationService();
        this.subscribeToValueChanges();
    }

    createForm() {
        this.form = this.formBuilder.group({
            'id': [0],
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
            console.log('Se ha enviao');
        } else {
            this.validacionService.showErrors(this.form);
        }
    }

    private initializeValidationService() {
        this.validacionService.inicializa(ESTRUCTURA_AGREGAR_ALUMNO, MENSAJES_AGREGAR_ALUMNO);
        this.subscriptions.push(this.validacionService.getErrorsObservable(this.form)
          .subscribe(newErrors => {
            this.errors = newErrors;
        }));
    }

    private subscribeToValueChanges(): void {
        const s1 = this.form.get('tieneAntecDeportivos').valueChanges.subscribe(val => {
          this.enableOrDisable(val, 'observacionesAntecDeportivos', false);
        });
        const s2 = this.form.get('tieneAntecMedicos').valueChanges.subscribe(val => {
          this.enableOrDisable(val, 'observacionesAntecMedicos', false);
        });
        this.subscriptions = [...this.subscriptions, s1, s2];
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
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
