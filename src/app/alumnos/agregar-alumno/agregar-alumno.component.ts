import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlumnosService} from '../services/alumnos.service';

@Component({
    selector: 'app-agregar-alumno',
    templateUrl: './agregar-alumno.component.html',
    styleUrls: ['./agregar-alumno.component.scss',
        '../../../assets/scss/components/_buttons.scss'],
    providers: [
        AlumnosService,
    ]
})
export class AgregarAlumnoComponent implements OnInit {

    form: FormGroup;
    cargando = false;
    error = '';

    constructor(private formBuilder: FormBuilder,
                private alumnosService: AlumnosService) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.formBuilder.group({
            'nombre': ['', [Validators.required]],
            'apellido': ['', [Validators.required]],
            'domicilio': ['', [Validators.required]],
            'correoElectronico': ['', [Validators.required, Validators.email]],
            'numeroDeTelefono': ['', [Validators.required, Validators.minLength(7)]],
            'antecedentesDeportivos': ['', [Validators.required]],
            'observaciones': ['', [Validators.required]],
        });
    }

    onSubmit() {
        this.error = ''; // Para que quite el error si lo mostró previamente.
        if (this.form.status === 'VALID') {
            this.cargando = true;
            // acá hacer alumnoService.post
        } else {

        }
    }
}
