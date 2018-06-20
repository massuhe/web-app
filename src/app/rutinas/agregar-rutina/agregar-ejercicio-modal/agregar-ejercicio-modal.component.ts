import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { EjerciciosService } from '../../../ejercicios/_services/ejercicios.service';
import { TipoEjercicio } from '../../../ejercicios/_models/TipoEjercicio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { DialogService } from '../../../core/dialog.service';
import { GENERIC_ERROR_MESSAGE } from '../../../app-constants';
import { Ejercicio } from '../../../ejercicios/_models/Ejercicio';

@Component({
  selector: 'app-agregar-ejercicio-modal',
  templateUrl: './agregar-ejercicio-modal.component.html',
  styleUrls: ['./agregar-ejercicio-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarEjercicioModalComponent implements OnInit {

  @Output() onAgregar = new EventEmitter<Ejercicio>();
  @Output() onClose = new EventEmitter<boolean>();

  tiposEjercicios: TipoEjercicio[];
  showContent: boolean;
  form: FormGroup;
  destroy$ = new Subject<boolean>();
  get tipoEjercicio(): TipoEjercicio {
    const idTipoEjercicio = Number(this.form.get('tipoEjercicio').value);
    return this.tiposEjercicios.find(te => te.id === idTipoEjercicio);
  }
  get ejercicio(): Ejercicio {
    const idEjercicio = Number(this.form.get('ejercicio').value);
    return this.tipoEjercicio.ejercicios.find(e => e.id === idEjercicio);
  }

  constructor(
    private ejercicioService: EjerciciosService,
    private builder: FormBuilder,
    private dialogService: DialogService
  ) { }

  @ViewChild(ModalComponent) modal;

  ngOnInit() {
    this.form = this.builder.group({
      tipoEjercicio: [],
      ejercicio: [, Validators.required]
    });
  }

  handleVisibilityChange(isVisible: boolean): void {
    if (isVisible) {
      this.handleIsVisible();
    } else {
      this.destroy$.next(true);
      this.form.reset({tipoEjercicio: this.tiposEjercicios[0].id, ejercicio: undefined});
      this.onClose.emit(true);
    }
  }

  handleAgregar(): void {
    if (this.ejercicio) {
      this.onAgregar.emit(this.ejercicio);
      this.closeModal();
    } else {
      this.form.get('ejercicio').markAsDirty();
    }
  }

  closeModal(): void {
    this.modal.hide();
  }

  private handleIsVisible(): void {
    if (!this.tiposEjercicios) {
      this.ejercicioService.getEjerciciosGroupedByTipo()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        tiposEjercicios => this.handleSuccessFetchEjercicios(tiposEjercicios),
        error => this.handleError(error)
      );
    } else {
      this.form.patchValue({tipoEjercicio: this.tiposEjercicios[0].id});
    }
  }

  private handleSuccessFetchEjercicios(tiposEjercicios: TipoEjercicio[]): void {
    this.tiposEjercicios = tiposEjercicios;
    this.form.patchValue({tipoEjercicio: tiposEjercicios[0].id});
    this.showContent = true;
  }

  private handleError(err): void {
    this.dialogService.error(err.clientMessage || GENERIC_ERROR_MESSAGE)
      .then(_ => this.modal.hide());
  }

}
