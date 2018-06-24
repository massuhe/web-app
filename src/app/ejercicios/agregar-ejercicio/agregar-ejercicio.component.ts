import { Component, OnInit, ViewEncapsulation, ViewChild, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ejercicio } from '../_models/Ejercicio';
import { TipoEjercicio } from '../_models/TipoEjercicio';
import { EjerciciosService } from '../_services/ejercicios.service';
import { DialogService } from '../../core/dialog.service';
import { ValidacionService } from '../../core/validacion.service';
import AppMessages from '../../_utils/AppMessages';
import { ENTIDADES, GUARDAR } from '../../app-constants';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-agregar-ejercicio',
  templateUrl: './agregar-ejercicio.component.html',
  styleUrls: ['./agregar-ejercicio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarEjercicioComponent implements OnInit, OnDestroy {

  form: FormGroup;
  showLoader: boolean;
  destroy$ = new Subject<boolean>();
  @Input() ejercicio: Ejercicio;
  @Input() tiposEjercicios: TipoEjercicio[];
  @Output() onGuardar = new EventEmitter<Ejercicio>();
  @ViewChild('modal') modal;

  constructor(
    private builder: FormBuilder,
    private ejercicioService: EjerciciosService,
    private dialogService: DialogService,
    private validationService: ValidacionService
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      'nombre': ['', Validators.required],
      'descripcion': [''],
      'tipoEjercicio': [, Validators.required]
    });
  }

  handleVisibilityChange(isVisible: boolean): void {
    if (isVisible) {
      this.fillForm();
    } else {
      this.form.reset();
    }
  }

  handleGuardar(): void {
    if (!this.form.valid) {
      this.validationService.recursiveMarkAsDirty(this.form);
      return ;
    }
    this.dialogService.confirm(AppMessages.confirm(ENTIDADES.EJERCICIO, GUARDAR)).then(
      ok => {
        this.showLoader = true;
        const ejercicioData = this.form.value;
        const ejercicio$ = this.ejercicio ?
          this.ejercicioService.editarEjercicio(this.ejercicio.id, ejercicioData)
          : this.ejercicioService.guardarEjercicio(ejercicioData);
        ejercicio$
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            ejercicio => this.successGuardarEjercicio(ejercicio),
            error => this.handleError(error)
          );
      },
      cancel => {}
    );
  }

  close(): void {
    this.modal.hide();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private successGuardarEjercicio(ejercicio): void {
    this.dialogService.success(AppMessages.success(ENTIDADES.EJERCICIO, GUARDAR)).then(
      ok =>  this.modal.hide(),
      cancel => {}
    );
    this.showLoader = false;
    this.onGuardar.emit(ejercicio);
  }

  private fillForm(): void {
    if (!this.ejercicio) {
      return ;
    }
    this.form.patchValue({
      ...this.ejercicio,
      tipoEjercicio: (this.ejercicio.tipoEjercicio as TipoEjercicio).id
    });
  }

  private handleError(error): void {
    this.showLoader = false;
    this.dialogService.error(AppMessages.error(error));
  }

}
