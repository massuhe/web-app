import { Component, OnInit, ViewEncapsulation, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { TipoEjercicio } from '../_models/TipoEjercicio';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DialogService } from '../../core/dialog.service';
import { EjerciciosService } from '../_services/ejercicios.service';
import { Subject } from 'rxjs/Subject';
import AppMessages from '../../_utils/AppMessages';
import { ENTIDADES, GUARDAR } from '../../app-constants';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-agregar-tipo-ejercicio',
  templateUrl: './agregar-tipo-ejercicio.component.html',
  styleUrls: ['./agregar-tipo-ejercicio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarTipoEjercicioComponent implements OnInit {

  form: FormGroup;
  showLoader: boolean;
  destroy$ = new Subject<boolean>();
  @Input() tipoEjercicio: TipoEjercicio;
  @Output() onGuardar = new EventEmitter<TipoEjercicio>();
  @ViewChild('modal') modal;

  constructor(
    private builder: FormBuilder,
    private dialogService: DialogService,
    private ejerciciosService: EjerciciosService
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      nombre: ['', Validators.required]
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
      this.form.get('nombre').markAsDirty();
      return ;
    }
    this.dialogService.confirm(AppMessages.confirm(ENTIDADES.TIPO_EJERCICIO, GUARDAR)).then(
      ok => {
        this.showLoader = true;
        const tipoEjercicioData = this.form.value;
        const tipoEjercicio$ = this.tipoEjercicio ?
          this.ejerciciosService.editarTipoEjercicio(this.tipoEjercicio.id, tipoEjercicioData)
          : this.ejerciciosService.guardarTipoEjercicio(tipoEjercicioData);
        tipoEjercicio$
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            tipoEjercicio => this.successGuardarTipoEjercicio(tipoEjercicio),
            error => this.handleError(error)
          );
      },
      cancel => {}
    );
  }

  close(): void {
    this.modal.hide();
  }

  private fillForm(): void {
    if (!this.tipoEjercicio) {
      return ;
    }
    this.form.patchValue({
      ...this.tipoEjercicio
    });
  }

  private successGuardarTipoEjercicio(tipoEjercicio: TipoEjercicio): void {
    this.dialogService.success(AppMessages.success(ENTIDADES.TIPO_EJERCICIO, GUARDAR)).then(
      ok =>  this.modal.hide(),
      cancel => {}
    );
    this.showLoader = false;
    this.onGuardar.emit(tipoEjercicio);
  }

  private handleError(err): void {
    this.showLoader = false;
    this.dialogService.error(AppMessages.error(err));
  }

}
