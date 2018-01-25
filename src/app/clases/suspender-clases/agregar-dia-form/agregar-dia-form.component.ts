import { Component, OnInit, ViewEncapsulation, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { DIAS_SEMANA } from '../../../actividades/constants';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { IDia } from '../../interfaces/IDia';
import { ValidacionService } from '../../../core/validacion.service';

@Component({
  selector: 'app-agregar-dia-form',
  templateUrl: './agregar-dia-form.component.html',
  styleUrls: ['./agregar-dia-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarDiaFormComponent implements OnInit {

  @Output() onAddDia = new EventEmitter<IDia>();
  @ViewChild('modal') modal;
  agregarDiaForm: FormGroup;
  diasSemana: IMultiSelectOption[];
  get rangosHorarios(): FormArray {
    return this.agregarDiaForm.get('rangosHorarios') as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private validationService: ValidacionService) { }

  ngOnInit() {
    this.diasSemana = DIAS_SEMANA.map((ds, i: number) => ({id: i, name: ds}));
    this.resetForm();
  }

  addItem() {
    const hourPattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    this.rangosHorarios.push(this.formBuilder.group({
      horaDesde: ['', {updateOn: 'blur', validators: [Validators.required, Validators.pattern(hourPattern)]}],
      horaHasta: ['', {updateOn: 'blur', validators: [Validators.required, Validators.pattern(hourPattern)]}]
    }));
  }

  deleteItem(index): void {
    this.rangosHorarios.removeAt(index);
  }

  handleSubmit() {
    if (this.agregarDiaForm.valid) {
      this.agregarDia();
    } else {
      this.validationService.showErrors(this.agregarDiaForm);
    }
  }

  handleVisibilityChange(isVisible: boolean) {
    if (isVisible) {
      this.resetForm();
    }
  }

  private agregarDia(): void {
    const value: IDia = this.agregarDiaForm.value;
    value.diaSemana = value.diaSemana.map(ds => DIAS_SEMANA[ds]);
    value.rangosHorarios = value.rangosHorarios.map(rh => ({
      horaDesde: rh.horaDesde + ':00',
      horaHasta: rh.horaHasta + ':00'
    }));
    this.onAddDia.emit(value);
    this.modal.hide();
  }

  private resetForm() {
    this.agregarDiaForm = this.formBuilder.group({
      diaSemana: ['', {updateOn: 'blur', validators: [Validators.required]}],
      rangosHorarios: new FormArray([])
    });
  }

}
