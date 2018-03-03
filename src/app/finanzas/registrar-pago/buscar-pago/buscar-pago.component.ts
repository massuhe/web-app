import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Alumno } from '../../../alumnos/models/alumno';
import { MESES_ANIO, GENERIC_ERROR_MESSAGE } from '../../../app-constants';
import { DialogService } from '../../../core/dialog.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Cuota } from '../../_models/Cuota';
import { CuotasService } from '../../_services/cuotas.service';
import { ValidacionService } from '../../../core/validacion.service';
import { ESTRUCTURA_BUSCAR_PAGO, MENSAJES_BUSCAR_PAGO } from '../../_constants/buscar-pago';

@Component({
  selector: 'app-buscar-pago',
  templateUrl: './buscar-pago.component.html',
  styleUrls: ['./buscar-pago.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ValidacionService]
})
export class BuscarPagoComponent implements OnInit, OnDestroy {

  @Output() onSearch = new EventEmitter<boolean>();
  @Output() onFindCuota = new EventEmitter<Cuota>();
  @ViewChild('inp') alumnoInput;
  meses = MESES_ANIO;
  alumnosItems: any;
  form: FormGroup;
  errors: any;
  $destroy = new Subject<boolean>();
  private alumnoSeleccionado: Alumno;

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private alumnosService: AlumnosService,
    private cuotasService: CuotasService,
    private validationService: ValidacionService
  ) { }

  ngOnInit() {
    this.initForm();
    this.fetchAlumno();
    this.initValidationService();
  }

  initForm(): void {
    const today = new Date();
    this.form = this.formBuilder.group({
      alumno: [undefined, { updateOn: 'blur', validators: [Validators.required] }],
      mes: [today.getMonth() + 1, { validators: [Validators.required] }],
      anio: [+today.getFullYear(), { validators: [Validators.required] }]
    });
  }

  formatAlumno(data: any): string {
    return data.name;
  }

  addAlumno(value: any): void {
    if (value instanceof Object && value !== this.alumnoSeleccionado) {
      this.alumnoSeleccionado = value;
      this.form.patchValue({alumno: value});
    } else {
      this.patchAlumnoSeleccionado();
    }
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.fetchPago();
    } else {
      this.validationService.showErrors(this.form);
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.unsubscribe();
  }

  private initValidationService() {
    this.validationService.inicializa(ESTRUCTURA_BUSCAR_PAGO, MENSAJES_BUSCAR_PAGO);
    this.validationService.getErrorsObservable(this.form)
    .subscribe(newErrors => {
      this.errors = newErrors;
    });
  }

  private fetchPago(): void {
    this.onFindCuota.emit(null);
    const alumno = this.form.get('alumno').value.key;
    const mes = this.form.get('mes').value;
    const anio = this.form.get('anio').value;
    this.onSearch.emit(true);
    this.cuotasService.findOrCreate(alumno, mes, anio)
    .pipe(
      takeUntil(this.$destroy),
      finalize(() => this.onSearch.emit(false))
    )
    .subscribe(
      (cuota: Cuota) => this.successFetchPago(cuota, alumno),
      err => this.handleError(err)
    );
  }

  private successFetchPago(cuota: Cuota, alumno: number) {
    const a = new Alumno();
    a.id = alumno;
    cuota.alumno = a;
    this.onFindCuota.emit(cuota);
  }

  private fetchAlumno(): void {
    this.onSearch.emit(true);
    this.alumnosService.getAlumnos(undefined, true)
    .pipe(
      takeUntil(this.$destroy),
      finalize(() => {
        this.onSearch.emit(false);
        this.alumnoInput.nativeElement.focus();
      })
    )
    .subscribe(
      (alumnos: Alumno[]) => this.alumnosItems = alumnos.map(a => ({key: a.id, name: a.fullName})),
      error => this.handleError(error)
    );
  }

  private patchAlumnoSeleccionado(): void {
    const alumnoValue = this.form.get('alumno').value;
    if (alumnoValue && !(alumnoValue instanceof Object)) {
      this.form.patchValue({alumno: this.alumnoSeleccionado});
    }
  }

  private handleError(res): void {
    this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
  }

}
