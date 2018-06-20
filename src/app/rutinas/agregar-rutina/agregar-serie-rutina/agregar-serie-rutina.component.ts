import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RutinaFormCreator } from '../../_services/rutina-form-creator';

@Component({
  selector: 'app-agregar-serie-rutina',
  templateUrl: './agregar-serie-rutina.component.html',
  styleUrls: ['./agregar-serie-rutina.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarSerieRutinaComponent implements OnInit {

  @Input() serie: FormGroup;
  @Input() set totalSemanas(value: number) {
    this.semanas = Array(Number(value)).fill(0).map((_, i) => i + 1);
    const semanaEspecificar = Number(this.serie.get('semanaEspecificar').value);
    if (semanaEspecificar > value) {
      this.serie.patchValue({semanaEspecificar: value});
    }
  }
  @Output() onShowModal = new EventEmitter<FormGroup>();
  @Output() onDeleteSerie = new EventEmitter<boolean>();

  semanas: number[];
  get items(): FormArray {
    return this.serie.get('items') as FormArray;
  }
  get especificarPorSemana(): boolean {
    return this.serie.get('especificarPorSemana').value;
  }

  constructor() { }

  ngOnInit() {
    const items = this.serie.value.items;
  }

  handleAgregarEjercicio(): void {
    this.onShowModal.emit(this.serie);
  }

}
