import { Component, OnInit, ViewEncapsulation, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TipoMovimiento } from '../../_models/TipoMovimiento';
import { Movimiento } from '../../_models/Movimiento';

@Component({
  selector: 'app-agregar-editar-movimiento',
  templateUrl: './agregar-editar-movimiento.component.html',
  styleUrls: ['./agregar-editar-movimiento.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarEditarMovimientoComponent implements OnInit {

  @Input() movimiento: Movimiento;
  @Output() onAgregarEditarMovimiento = new EventEmitter<any>();
  @ViewChild('modal') modal;
  isEditando: boolean;
  form: FormGroup;
  tipoMovimiento = TipoMovimiento;
  get descripcionControl(): AbstractControl {
    return this.form.get('descripcion');
  }
  get importeControl(): AbstractControl {
    return this.form.get('importe');
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      importe: [0, [Validators.required]],
      tipoMovimiento: [{value: undefined, disabled: true}],
      esPersonal: [false]
    });
  }

  handleVisibilityChange(isVisible: boolean): void {
    if (isVisible) {
      this.isEditando = !!this.movimiento.id;
      this.form.patchValue({
        descripcion: this.movimiento.descripcion,
        importe: this.movimiento.importe || 0,
        tipoMovimiento: this.movimiento.tipoMovimiento,
        esPersonal: this.movimiento.esPersonal || false
      });
    } else {
      this.form.reset();
    }
  }

  handleGuardar(): void {
    if (this.form.valid) {
      this.onAgregarEditarMovimiento.emit(this.form.getRawValue());
      this.close();
    } else {
      Object.keys(this.form.controls).forEach(c => (this.form.get(c) as AbstractControl).markAsDirty());
    }
  }

  close(): void {
    this.modal.hide();
  }

}
