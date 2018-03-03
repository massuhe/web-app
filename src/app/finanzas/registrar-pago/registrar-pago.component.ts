import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AlumnosService } from '../../alumnos/services/alumnos.service';
import { Observable } from 'rxjs/Observable';
import { Alumno } from '../../alumnos/models/alumno';
import { Subject } from 'rxjs/Subject';
import { takeUntil, finalize, tap, switchMap, debounceTime } from 'rxjs/operators';
import { DialogService } from '../../core/dialog.service';
import { GENERIC_ERROR_MESSAGE, MESES_ANIO, GUARDAR } from '../../app-constants';
import { merge } from 'rxjs/observable/merge';
import { Cuota } from '../_models/Cuota';
import { Pago } from '../_models/Pago';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { CuotasService } from '../_services/cuotas.service';
import AppMessages from '../../_utils/AppMessages';
import { ValidacionService } from '../../core/validacion.service';
import { ESTRUCTURA_REGISTRAR_PAGO, MENSAJES_REGISTRAR_PAGO } from '../_constants/registrar-pago';
import GenericValidators from '../../shared/_validators/GenericValidators';
import CuotasValidators from '../_validators/CuotasValidators';

const ENTIDAD = 'El pago';

@Component({
  selector: 'app-registrar-pago',
  templateUrl: './registrar-pago.component.html',
  styleUrls: ['./registrar-pago.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ValidacionService]
})
export class RegistrarPagoComponent implements OnInit, OnDestroy {

  showLoader: boolean;
  form: FormGroup;
  cuota: Cuota;
  cuotaFound: boolean;
  errors: any;
  private $destroy = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private alumnosService: AlumnosService,
    private dialogService: DialogService,
    private cuotasService: CuotasService,
    private validationService: ValidacionService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      importeTotal: [0, {updateOn: 'blur', validators: [Validators.required]}],
      importePaga: [0, {updateOn: 'blur', validators: [Validators.required, GenericValidators.greaterThanZero]}],
      debe: [{value: 0, disabled: true}],
      editarValor: [false],
      observaciones: ['']
    });
    this.form.setAsyncValidators([CuotasValidators.debeNotNegative]);
    this.initValidationService();
    this.updateDebeOnImporteChange();
    this.subscribeToEditarValorChanges();
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.guardarCuota();
    } else {
      this.validationService.showErrors(this.form);
    }
  }

  handleOnSearch(isSearching: boolean): void {
    setTimeout(_ => this.showLoader = isSearching);
  }

  handleFindCuota(cuota: Cuota): void {
    this.cuota = cuota;
    this.cuotaFound = !!cuota;
    if (this.cuotaFound) {
      this.form.reset({
        importeTotal: cuota.importeTotal,
        importePaga: 0,
        observaciones: cuota.observaciones
      });
      this.enableDisableImporteTotal(!cuota.id);
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.unsubscribe();
  }

  private guardarCuota(): void {
    this.dialogService.confirm(AppMessages.confirm(ENTIDAD, GUARDAR))
    .then(
      ok => {
        this.showLoader = true;
        const value = this.getFormValue();
        this.cuotasService.registrarPago(value)
          .pipe(
            takeUntil(this.$destroy),
            finalize(() => this.showLoader = false)
          )
          .subscribe(
            newCuota => this.handleSuccess(newCuota),
            error => this.handleError(error)
          );
      },
      cancelar => {}
    );
  }

  private updateDebeOnImporteChange(): void {
    combineLatest(
      this.form.get('importeTotal').valueChanges,
      this.form.get('importePaga').valueChanges,
    ).subscribe(([importeTotal, importePaga]) => {
      this.form.patchValue({debe: this.calcularDebe(importeTotal, importePaga)});
    });
  }

  private subscribeToEditarValorChanges(): void {
    this.form.get('editarValor').valueChanges
      .subscribe(value => this.enableDisableImporteTotal(value));
  }

  private initValidationService() {
    this.validationService.inicializa(ESTRUCTURA_REGISTRAR_PAGO, MENSAJES_REGISTRAR_PAGO);
    this.validationService.getErrorsObservable(this.form)
    .subscribe(newErrors => {
      this.errors = newErrors;
    });
  }
  private enableDisableImporteTotal(enable: boolean): void {
    const iTotal = this.form.get('importeTotal');
    enable ? iTotal.enable() : iTotal.disable();
  }

  private handleSuccess(cuota: Cuota): void {
    this.dialogService.success(AppMessages.success(ENTIDAD, GUARDAR));
    this.handleFindCuota(cuota);
  }

  private handleError(res): void {
    this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
  }

  private calcularDebe(importeTotal: number, importePaga: number): number {
    const pago = this.cuota.pagos ? this.cuota.pagos.reduce((pv, cv) => pv + cv.importe, 0) : 0;
    return importeTotal - pago - importePaga;
  }

  private getFormValue(): Partial<Cuota> {
    const {editarValor, debe, ...formValue} = this.form.getRawValue();
    return { ...formValue,
      alumno: this.cuota.alumno.id,
      mes: this.cuota.mes,
      anio: this.cuota.anio
    };
  }

}
