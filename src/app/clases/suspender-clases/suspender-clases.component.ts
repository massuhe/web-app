import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { IDia } from '../interfaces/IDia';
import { DialogService } from '../../core/dialog.service';
import { ClasesService } from '../services/clases.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { ValidacionService } from '../../core/validacion.service';
import {
  ESTRUCTURA_SUSPENDER_CLASES,
  MENSAJES_SUSPENDER_CLASES
} from '../_constants/suspender-clases';
import GenericValidators from '../../shared/_validators/GenericValidators';
import { ActividadesService } from '../../actividades/services/actividades.service';
import { Actividad } from '../../actividades/models/Actividad';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { SUSPENDER, HABILITAR, ENTIDADES } from '../../app-constants';
import AppMessages from '../../_utils/AppMessages';

@Component({
  selector: 'app-suspender-clases',
  templateUrl: './suspender-clases.component.html',
  styleUrls: ['./suspender-clases.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SuspenderClasesComponent implements OnInit, OnDestroy {
  form: FormGroup;
  dias: IDia[];
  showLoader: boolean;
  errors: any;
  options: IMultiSelectOption[];
  subscription: Subscription;
  destroy$ = new Subject<boolean>();

  constructor(
    private clasesService: ClasesService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private validationService: ValidacionService,
    private actividadesService: ActividadesService
  ) {}

  ngOnInit() {
    this.dias = [];
    this.form = this.formBuilder.group({
      actividades: [
        [],
        { updateOn: 'blur', validators: [Validators.required] }
      ],
      motivo: [''],
      accion: ['1', { updateOn: 'change', validators: [Validators.required] }],
      fechaDesde: [
        null,
        { updateOn: 'blur', validators: [Validators.required] }
      ],
      fechaHasta: [null, { updateOn: 'blur' }],
      indefinido: [false]
    });
    this.form
      .get('fechaHasta')
      .setValidators(
        GenericValidators.requiredIf(this.form.get('indefinido'), false)
      );
    this.initializeValidationService();
    this.fetchActividades();
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.aplicarSuspension();
    } else {
      this.validationService.showErrors(this.form);
    }
  }

  handleAddDia(dia: IDia): void {
    this.dias = [...this.dias, dia];
  }

  handleDeleteDia(indexDelete: number): void {
    this.dias = [
      ...this.dias.slice(0, indexDelete),
      ...this.dias.slice(indexDelete + 1)
    ];
  }

  fetchActividades(): void {
    this.showLoader = true;
    this.actividadesService
      .get(['id', 'nombre'])
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((actividades: Actividad[]) => {
        this.options = actividades.map(a => ({ name: a.nombre, id: a.id }));
        this.showLoader = false;
      }, this.onError.bind(this));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
    this.subscription.unsubscribe();
  }

  private aplicarSuspension(): void {
    const accion = this.getAccion();
    this.dialogService
      .confirm(AppMessages.confirm(ENTIDADES.CLASES, accion, false, false))
      .then(
        (res: boolean) => {
          this.showLoader = true;
          const value = this.form.getRawValue();
          value.dias = this.dias;
          this.clasesService
            .suspenderClases(value)
            .pipe(
              finalize(() => (this.showLoader = false)),
              takeUntil(this.destroy$)
            )
            .subscribe(this.onSuccess.bind(this), this.onError.bind(this));
        },
        cancel => {}
      );
  }

  private onSuccess(response: any): void {
    const accion = this.getAccion();
    this.dialogService.success(AppMessages.success(ENTIDADES.CLASES, accion, false, false));
    this.form.reset({ indefinido: false, accion: '1' });
    this.dias = [];
  }

  private onError(res: any): void {
    this.dialogService.error(AppMessages.error(res));
  }

  private initializeValidationService() {
    this.validationService.inicializa(
      ESTRUCTURA_SUSPENDER_CLASES,
      MENSAJES_SUSPENDER_CLASES
    );
    this.subscription = this.validationService
      .getErrorsObservable(this.form)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(newErrors => {
        this.errors = newErrors;
      });
  }

  private getAccion(): any {
    const accionValue = this.form.get('accion').value;
    return accionValue === '1' ? SUSPENDER : HABILITAR;
  }
}
