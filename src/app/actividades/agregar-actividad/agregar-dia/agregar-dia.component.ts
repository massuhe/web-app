import { ViewChild, Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { FormGroup, FormBuilder, FormArray, AbstractControl, Validators, FormControl } from '@angular/forms';

import { DIAS_SEMANA } from '../../constants';
import DiaActividad from '../../models/DiaActividad';
import DiaHorariosValidators from '../../../shared/_validators/DiaHorariosValidators';

@Component({
  selector: 'app-agregar-dia',
  templateUrl: './agregar-dia.component.html',
  styleUrls: ['./agregar-dia.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarDiaComponent implements OnInit {

  @Input() diasNoDisponibles: string[];
  @Output() onSubmit = new EventEmitter<DiaActividad>();
  @ViewChild('modal') modal;
  agregarDiaForm: FormGroup;
  dias: { nombre: string, id: number }[];
  get rangosHorarios(): FormArray {
    return this.agregarDiaForm.get('horarios') as FormArray;
  }
  get diaSemana(): FormControl {
    return this.agregarDiaForm.get('diaSemana') as FormControl;
  }
  get emptyHorarios(): boolean {
    return this.agregarDiaForm.hasError('emptyHorarios');
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dias = DIAS_SEMANA.map((n: string, id: number) => ({ nombre: n, id: id }));
    this.agregarDiaForm = this.formBuilder.group({
      diaSemana: ['0', []],
      horarios: new FormArray([])
    });
  }

  addItem() {
    const hourPattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    (<FormArray>this.agregarDiaForm.get('horarios'))
      .push(this.formBuilder.group({
        horaDesde: ['', {updateOn: 'blur', validators: [Validators.required, Validators.pattern(hourPattern)]}],
        horaHasta: ['', {updateOn: 'blur', validators: [Validators.required, Validators.pattern(hourPattern)]}]
      }));
  }

  deleteItem(index): void {
    (<FormArray>this.agregarDiaForm.get('horarios')).removeAt(index);
  }

  handleVisibilityChange(isVisible): void {
    if (isVisible) {
      this.agregarDiaForm = new FormGroup({
        diaSemana: new FormControl('0', {updateOn: 'change',
          validators: [DiaHorariosValidators.diaRepetidoValidator(this.diasNoDisponibles)]}),
        horarios: new FormArray([])
      }, {updateOn: 'submit', validators: [DiaHorariosValidators.tieneHorarios]});
    }
  }

  handleSubmit(): void {
    if (this.agregarDiaForm.valid) {
      this.agregarDia();
    } else {
      this.showErrors();
    }
  }

  private agregarDia() {
    const diaAgregar = {...this.agregarDiaForm.value, diaSemana: DIAS_SEMANA[+this.agregarDiaForm.value.diaSemana]};
    this.onSubmit.emit(diaAgregar);
    this.modal.hide();
  }

  private showErrors() {
    const controls = Object.keys(this.agregarDiaForm.controls).map(c => this.agregarDiaForm.get(c));
    controls.forEach(con => {
      this.markIfDirty(con);
    });
  }

  private markIfDirty(control: AbstractControl) {
    control.markAsDirty();
    if (control instanceof FormControl) {
      control.updateValueAndValidity();
    } else if (control instanceof FormArray) {
      control.controls.forEach(controlGroup => this.markIfDirty(controlGroup));
    } else if (control instanceof FormGroup) {
      Object.keys(control.controls).map(c => control.get(c)).forEach(con => this.markIfDirty(con));
    }
  }

}
