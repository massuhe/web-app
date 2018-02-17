import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlumnosService} from '../services/alumnos.service';
import {ValidacionService} from '../../core/validacion.service';
import {ESTRUCTURA_AGREGAR_ALUMNO, MENSAJES_AGREGAR_ALUMNO} from '../_constants/agregar-alumno';
import { takeUntil, switchMap, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Clase } from '../../clases/models/clase';
import { DialogService } from '../../core/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from '../models/alumno';
import { GENERIC_ERROR_MESSAGE, SUCCESS_MESSAGE, GUARDAR } from '../../app-constants';
import AppMessages from '../../_utils/AppMessages';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

const ENTIDAD = 'El alumno';

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
    clases: Clase[];
    showLoader: boolean;
    editar: boolean;
    idAlumno: number;
    $destroy: Subject<boolean>;

    constructor (
        private formBuilder: FormBuilder,
        private alumnosService: AlumnosService,
        private validacionService: ValidacionService,
        private dialogService: DialogService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.clases = [];
        this.defineMode();
        this.createForm();
        this.initializeValidationService();
        this.subscribeToValueChanges();
        this.fetchAlumno();
    }

    handleSubmit() {
        if (this.form.valid) {
            this.dialogService.confirm(AppMessages.confirm(ENTIDAD, GUARDAR)).then(_ => {
                this.showLoader = true;
                const value = this.getFormValue();
                const $alumno = this.editar ?
                    this.alumnosService.editarAlumno(this.idAlumno, value) :
                    this.alumnosService.guardarAlumno(value);
                $alumno.subscribe(this.onSuccess.bind(this)(GUARDAR), this.onError.bind(this));
            }, cancel => {});
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

    private defineMode() {
        this.route.url.subscribe(url => {
          this.editar = url[1].path === 'editar' ? true : false;
        });
    }

    private createForm() {
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

    private onSuccess(accion: string) {
        return res => {
            this.showLoader = false;
            this.dialogService.success(AppMessages.success(ENTIDAD, accion))
            .then(
                ok => {
                    if (!this.editar) {
                        this.clases = [];
                        this.form.reset({tieneAntecDeportivos: false, tieneAntecMedicos: false});
                        this.router.navigate(['alumnos']);
                    }
                },
                cancelar => {}
            );
        };
    }

    private onError(res) {
        this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
        this.showLoader = false;
    }

    private enableOrDisable(val, formName, disableValue): void {
        if (val === disableValue) {
          this.form.controls[formName].disable();
          this.form.patchValue({[formName]: ''});
        } else {
          this.form.controls[formName].enable();
        }
    }

    private fetchAlumno(): void {
        this.route.params.pipe(
            switchMap(p => this.getAlumno(+p['idAlumno'])),
            takeUntil(this.$destroy)
        ).subscribe((alumno: Alumno) => {
            this.idAlumno = alumno.id;
            this.clases = alumno.clases;
            this.form.setValue({
                'email': alumno.email,
                'nombre':  alumno.nombre,
                'apellido': alumno.apellido,
                'domicilio': alumno.apellido,
                'tieneAntecDeportivos': alumno.tieneAntecDeportivos,
                'observacionesAntecDeportivos': alumno.observacionesAntecDeportivos,
                'telefono': alumno.telefono,
                'tieneAntecMedicos': alumno.tieneAntecMedicos,
                'observacionesAntecMedicos': alumno.observacionesAntecMedicos
            });
        }, res => this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE));
    }

    private getAlumno(idAlumno: number): Observable<Alumno> {
        if (!idAlumno) {
            return empty();
        }
        this.showLoader = true;
        return this.alumnosService.getById(idAlumno, {withClases: true}).pipe(
            finalize(() => this.showLoader = false)
        );
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

    private getFormValue() {
        const {nombre, apellido, email, domicilio, telefono, tieneAntecDeportivos, tieneAntecMedicos,
            observacionesAntecDeportivos, observacionesAntecMedicos} = this.form.getRawValue();
        return {
            nombre, apellido, email, domicilio, telefono,
            alumno: { clases: this.clases.map(c => c.id ),
                tieneAntecDeportivos, observacionesAntecDeportivos, tieneAntecMedicos, observacionesAntecMedicos }
        };
    }

    ngOnDestroy() {
        this.$destroy.next(true);
        this.$destroy.unsubscribe();
    }
}
