import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AlumnosService } from '../services/alumnos.service';
import { ValidacionService } from '../../core/validacion.service';
import {
  ESTRUCTURA_AGREGAR_ALUMNO,
  MENSAJES_AGREGAR_ALUMNO
} from '../_constants/agregar-alumno';
import { takeUntil, switchMap, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Clase } from '../../clases/models/clase';
import { DialogService } from '../../core/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from '../models/alumno';
import {
  GENERIC_ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  GUARDAR,
  ENTIDADES
} from '../../app-constants';
import AppMessages from '../../_utils/AppMessages';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { ImagesService } from '../../core/images.service';
import GenericValidators from '../../shared/_validators/GenericValidators';

@Component({
  selector: 'app-agregar-alumno',
  templateUrl: './agregar-alumno.component.html',
  styleUrls: [
    './agregar-alumno.component.scss',
    '../../../assets/scss/components/_buttons.scss'
  ],
  providers: [AlumnosService, ValidacionService]
})
export class AgregarAlumnoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  cargando = false;
  errors: any;
  clases: Clase[];
  showLoader: boolean;
  editar: boolean;
  idAlumno: number;
  imagenPerfil: string;
  destroy$ = new Subject<boolean>();

  get passwordGroup(): AbstractControl {
    return this.form.get('passwordGroup');
  }

  constructor(
    private formBuilder: FormBuilder,
    private alumnosService: AlumnosService,
    private validacionService: ValidacionService,
    private dialogService: DialogService,
    private imagesService: ImagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.clases = [];
    this.createForm();
    this.defineMode();
    this.initializeValidationService();
    this.subscribeToValueChanges();
    this.fetchAlumno();
  }

  handleSubmit(): void {
    if (!this.form.valid) {
      this.validacionService.showErrors(this.form);
      return ;
    }
    this.dialogService
      .confirm(AppMessages.confirm(ENTIDADES.ALUMNO, GUARDAR))
      .then(
        ok => {
          this.showLoader = true;
          const value = this.getFormValue();
          const $alumno = this.editar
            ? this.alumnosService.editarAlumno(this.idAlumno, value)
            : this.alumnosService.guardarAlumno(value);
          $alumno.subscribe(
            this.onSuccess.bind(this)(GUARDAR),
            this.onError.bind(this)
          );
        },
        cancel => {}
      );
  }

  handleSelectClase(clase: Clase): void {
    const existeClase = !!this.clases.find(c => clase.id === c.id);
    if (!existeClase) {
      this.clases = [...this.clases, clase];
    }
  }

  handleDeleteClase(indexDelete: number): void {
    this.clases = [
      ...this.clases.slice(0, indexDelete),
      ...this.clases.slice(indexDelete + 1)
    ];
  }

  handleImageChange(e): void {
    this.imagesService.blobToString(e.target.files[0]).then(url => {
      this.imagenPerfil = url;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private defineMode() {
    this.route.url.pipe(takeUntil(this.destroy$)).subscribe(url => {
      this.editar = url[0].path === 'agregar' ? false : true;
      if (!this.editar) {
        this.addPasswordControl();
      }
    });
  }

  private createForm() {
    this.form = this.formBuilder.group({
      email: [
        '',
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.email]
        }
      ],
      nombre: ['', { updateOn: 'blur', validators: [Validators.required] }],
      apellido: ['', { updateOn: 'blur', validators: [Validators.required] }],
      domicilio: ['', { updateOn: 'blur' }],
      tieneAntecDeportivos: [false],
      observacionesAntecDeportivos: [{ value: '', disabled: true }],
      telefono: [
        '',
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.pattern(/^\d+$/)]
        }
      ],
      tieneAntecMedicos: [false],
      observacionesAntecMedicos: [{ value: '', disabled: true }]
    });
  }

  private addPasswordControl(): void {
    const passwordGroup = new FormGroup(
      {
        password: new FormControl('', { updateOn: 'blur', validators: [Validators.required, Validators.minLength(6)] }),
        passwordConfirm: new FormControl('', { updateOn: 'blur' })
      },
      { validators: [GenericValidators.matchFields(['password', 'passwordConfirm'])], updateOn: 'blur' }
    );
    this.form.addControl('passwordGroup', passwordGroup);
  }

  private onSuccess(accion: string) {
    return res => {
      this.showLoader = false;
      this.dialogService
        .success(AppMessages.success(ENTIDADES.ALUMNO, accion))
        .then(
          ok => {
            if (!this.editar) {
              this.clases = [];
              this.form.reset({
                tieneAntecDeportivos: false,
                tieneAntecMedicos: false
              });
              this.router.navigate(['alumnos']);
            }
          },
          cancelar => {}
        );
    };
  }

  private onError(res) {
    this.dialogService.error(AppMessages.error(res));
    this.showLoader = false;
  }

  private enableOrDisable(val, formName, disableValue): void {
    if (val === disableValue) {
      this.form.controls[formName].disable();
      this.form.patchValue({ [formName]: '' });
    } else {
      this.form.controls[formName].enable();
    }
  }

  private fetchAlumno(): void {
    this.route.params
      .pipe(
        switchMap(p => this.getAlumno(+p['idAlumno'])),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (alumno: Alumno) => this.successFetchAlumno(alumno),
        res => this.onError(res)
      );
  }

  private successFetchAlumno(alumno: Alumno): void {
    this.idAlumno = alumno.usuarioId;
    this.clases = alumno.clases;
    this.form.patchValue({
      email: alumno.email,
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      domicilio: alumno.domicilio,
      tieneAntecDeportivos: alumno.tieneAntecDeportivos,
      observacionesAntecDeportivos: alumno.observacionesAntecDeportivos,
      telefono: alumno.telefono,
      tieneAntecMedicos: alumno.tieneAntecMedicos,
      observacionesAntecMedicos: alumno.observacionesAntecMedicos
    });
  }

  private getAlumno(idAlumno: number): Observable<Alumno> {
    if (!idAlumno) {
      return empty();
    }
    this.showLoader = true;
    return this.alumnosService
      .getById(idAlumno, { withClases: true })
      .pipe(finalize(() => (this.showLoader = false)));
  }

  private initializeValidationService() {
    this.validacionService.inicializa(
      ESTRUCTURA_AGREGAR_ALUMNO,
      MENSAJES_AGREGAR_ALUMNO
    );
    this.validacionService
      .getErrorsObservable(this.form)
      .subscribe(newErrors => {
        this.errors = newErrors;
      });
  }

  private subscribeToValueChanges(): void {
    this.form
      .get('tieneAntecDeportivos')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.enableOrDisable(val, 'observacionesAntecDeportivos', false);
      });
    this.form
      .get('tieneAntecMedicos')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.enableOrDisable(val, 'observacionesAntecMedicos', false);
      });
  }

  private getFormValue() {
    const {
      nombre,
      apellido,
      email,
      domicilio,
      passwordGroup: {password},
      telefono,
      tieneAntecDeportivos,
      tieneAntecMedicos,
      observacionesAntecDeportivos,
      observacionesAntecMedicos,
      passwordGroup
    } = this.form.getRawValue();
    return {
      nombre,
      apellido,
      email,
      domicilio,
      telefono,
      password,
      alumno: {
        clases: this.clases.map(c => c.id),
        imagen: this.imagenPerfil,
        tieneAntecDeportivos,
        observacionesAntecDeportivos,
        tieneAntecMedicos,
        observacionesAntecMedicos
      }
    };
  }
}
