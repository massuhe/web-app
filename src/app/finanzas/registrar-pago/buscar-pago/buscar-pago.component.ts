import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Alumno } from '../../../alumnos/models/alumno';
import { MESES_ANIO, GENERIC_ERROR_MESSAGE } from '../../../app-constants';
import { DialogService } from '../../../core/dialog.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { takeUntil, finalize, switchMap, mergeMap, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Cuota } from '../../_models/Cuota';
import { CuotasService } from '../../_services/cuotas.service';
import { ValidacionService } from '../../../core/validacion.service';
import { ESTRUCTURA_BUSCAR_PAGO, MENSAJES_BUSCAR_PAGO } from '../../_constants/buscar-pago';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

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
  private alumnoSeleccionado: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private alumnosService: AlumnosService,
    private cuotasService: CuotasService,
    private validationService: ValidacionService
  ) { }

  ngOnInit() {
    this.initForm();
    this.initValidationService();
    this.onSearch.emit(true);
    this.fetchAlumnoCuotaByParamsIfExists();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      alumno: [undefined, { updateOn: 'blur', validators: [Validators.required] }],
      mes: [, { validators: [Validators.required] }],
      anio: [, { validators: [Validators.required] }]
    });
    this.initFormWithParamsIfExists();
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

  patchAlumnoSeleccionado(): void {
    const alumnoValue = this.form.get('alumno').value;
    if (alumnoValue && !(alumnoValue instanceof Object)) {
      this.form.patchValue({alumno: this.alumnoSeleccionado});
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

  private fetchAlumnoCuotaByParamsIfExists(): void {
    this.route.queryParams.pipe(
      switchMap(params => {
        const alumno$: Observable<Alumno | Alumno[]> = params.alumno ?
          this.alumnosService.getById(params.alumno, {useAlumnoId: true})
          : this.alumnosService.getAlumnos();
        return alumno$.pipe(map(al => ({al, params})));
      }),
      switchMap(({al, params}) => {
        const cuota$: Observable<Cuota | {}> = params.alumno ?
          this.cuotasService.get(Number(params.alumno), Number(params.mes), Number(params.anio))
          : of({});
        return cuota$.pipe(map(pago => ({alumnos: al, pago, alumno: params.alumno})));
      }),
      takeUntil(this.$destroy)
    )
    .subscribe(
      ({alumnos, alumno, pago}) => this.onSuccess(alumnos, alumno, pago),
      error => this.handleError(error)
    );
  }

  private initFormWithParamsIfExists(): void {
    const today = new Date();
    this.route.queryParams.subscribe(
      params => this.form.patchValue({
        mes: params.mes || today.getMonth() + 1,
        anio: params.anio || +today.getFullYear()
      })
    );
  }

  private onSuccess(alumnos: Alumno | Alumno[], alumno: number, pago: Cuota | {}): void {
    this.onSearch.emit(false);
    this.handleAlumnoResults(alumnos, Number(alumno));
    if (pago instanceof Cuota) {
      this.successFetchPago(pago, alumno);
    }
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
    this.cuotasService.get(alumno, mes, anio)
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

  private handleAlumnoResults(alumnos: Alumno[] | Alumno, alumnoId: number): void {
    if (alumnos instanceof Array) {
      this.alumnosItems = alumnos.map(a => ({key: a.id, name: a.fullName}));
    } else {
      if (!alumnos) {
        return ;
      }
      this.alumnoSeleccionado = {key: alumnos.id, name: alumnos.fullName, toString: () => alumnos.fullName};
      this.form.patchValue({alumno: this.alumnoSeleccionado});
      this.form.get('alumno').disable();
    }
    this.alumnoInput.nativeElement.focus();
  }

  private handleError(res): void {
    this.onSearch.emit(false);
    this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
  }

}
