import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { IDia } from '../interfaces/IDia';
import { DialogService } from '../../core/dialog.service';
import { ClasesService } from '../services/clases.service';
import { finalize } from 'rxjs/operators';
import { ValidacionService } from '../../core/validacion.service';
import { ESTRUCTURA_SUSPENDER_CLASES, MENSAJES_SUSPENDER_CLASES } from '../_constants/suspender-clases';
import GenericValidators from '../../shared/_validators/GenericValidators';
import { ActividadesService } from '../../actividades/services/actividades.service';
import { Actividad } from '../../actividades/models/Actividad';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Subscription } from 'rxjs/Subscription';

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

  constructor(
    private clasesService: ClasesService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private validationService: ValidacionService,
    private actividadesService: ActividadesService
  ) { }

  ngOnInit() {
    this.dias = [];
    this.form = this.formBuilder.group({
      actividades: [[], { updateOn: 'blur', validators: [Validators.required] }],
      motivo: [''],
      accion: ['1', { updateOn: 'blur', validators: [Validators.required] }],
      fechaDesde: [null, { updateOn: 'blur', validators: [Validators.required] }],
      fechaHasta: [null, { updateOn: 'blur' }],
      indefinido: [false]
    });
    this.form.get('fechaHasta').setValidators(GenericValidators.requiredIf(this.form.get('indefinido'), false));
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
    this.dias = [...this.dias.slice(0, indexDelete), ...this.dias.slice(indexDelete + 1)];
  }

  fetchActividades(): void {
    this.showLoader = true;
    this.actividadesService.get(['id', 'nombre'])
    .subscribe((actividades: Actividad[]) => {
      this.options = actividades.map(a => ({name: a.nombre, id: a.id}));
      this.showLoader = false;
    }, this.onError.bind(this));
  }

  private aplicarSuspension(): void {
    this.dialogService.confirm('La acción será aplicada. ¿Desea continuar?')
      .then((res: boolean) => {
          this.showLoader = true;
          const value = this.form.getRawValue();
          value.dias = this.dias;
          this.clasesService.suspenderClases(value)
            .pipe(finalize(() => this.showLoader = false))
            .subscribe(this.onSuccess.bind(this), this.onError.bind(this));
      }, cancel => {});
  }

  private onSuccess(response: any): void {
    this.dialogService.success('La acción fue aplicada correctamente');
    this.form.reset({indefinido: false, accion: '1'});
    this.dias = [];
  }

  private onError(res: any): void {
    this.dialogService.error(res.error.message || 'Se ha producido un error inesperado');
  }

  private initializeValidationService() {
    this.validationService.inicializa(ESTRUCTURA_SUSPENDER_CLASES, MENSAJES_SUSPENDER_CLASES);
    this.subscription = this.validationService.getErrorsObservable(this.form)
      .subscribe(newErrors => {
        this.errors = newErrors;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
