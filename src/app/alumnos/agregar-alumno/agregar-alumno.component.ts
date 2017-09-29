import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlumnosService} from '../services/alumnos.service';
import {ValidacionService} from '../../core/validacion.service';
import {ESTRUCTURA_AGREGAR_ALUMNO, MENSAJES_AGREGAR_ALUMNO} from '../services/estructura-validation';

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
export class AgregarAlumnoComponent implements OnInit {

    form: FormGroup;
    cargando = false;
    error = '';
    public formErrors = ESTRUCTURA_AGREGAR_ALUMNO;
    mensajes = MENSAJES_AGREGAR_ALUMNO;

    constructor(private formBuilder: FormBuilder,
                private alumnosService: AlumnosService,
                private validacionService: ValidacionService) {
        this.validacionService.inicializa(this.formErrors, this.mensajes);
        this.validacionService.getEstructura().subscribe(
            estructura => {
                this.formErrors = estructura;
            }
        );
    }

    ngOnInit() {
        this.createForm();
    }

    onValueChanged() {
        this.validacionService.verificarCampos(this.form);
    }

    createForm() {
        this.form = this.formBuilder.group({
            'id': [0],
            'nombre': ['', [Validators.required]],
            'apellido': ['', [Validators.required]],
            'domicilio': ['', [Validators.required]],
            'email': ['', [Validators.required, Validators.email]],
            'telefono': ['', [Validators.required]],
            'tieneAntecDeportivos': [false, [Validators.required]],
            'observaciones': [''],
        });
        this.form.valueChanges
            .subscribe(data => this.onValueChanged());
        this.onValueChanged(); // (re)set validation messages now
    }

    onSubmit() {
        this.error = ''; // Para que quite el error si lo mostró previamente.
        if (this.form.status === 'VALID') {
            this.cargando = true;

            let alumno: any = {};
            alumno = Object.assign(alumno, this.form.value);
            delete alumno['id'];
            delete alumno['tieneAntecDeportivos'];
            alumno['alumno'] = {
                'tieneAntecDeportivos': this.form.value.tieneAntecDeportivos,
            };

            let objeto;
            if (this.form.value.id) {
                objeto = this.alumnosService.put(alumno, this.form.value.id);
            } else {
                objeto = this.alumnosService.post(alumno);
            }

            objeto.subscribe(
                resultado => {
                    this.cargando = false;
                    // todo rutear a alumnos/listado
                },
                error => {
                    this.cargando = false;
                    this.error = error.message;
                }
            );
        } else {
            this.validacionService.validateAllFormFields(this.form);
            this.validacionService.verificarCampos(this.form);
        }
    }
}
