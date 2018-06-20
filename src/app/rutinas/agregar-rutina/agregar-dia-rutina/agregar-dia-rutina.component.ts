import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RutinaFormCreator } from '../../_services/rutina-form-creator';

@Component({
  selector: 'app-agregar-dia-rutina',
  templateUrl: './agregar-dia-rutina.component.html',
  styleUrls: ['./agregar-dia-rutina.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarDiaRutinaComponent implements OnInit {

  @Input() dia: FormGroup;
  @Input() totalSemanas: number;
  @Output() onShowModal = new EventEmitter<boolean>();
  @Output() onDeleteDia = new EventEmitter<FormGroup>();
  get series(): FormArray {
    return this.dia.get('series') as FormArray;
  }

  constructor() { }

  ngOnInit() {

  }

  handleAgregarSerie(): void {
    this.series.push(RutinaFormCreator.getSerieRutinaGroup());
  }

  handleDeleteDia(): void {
    this.onDeleteDia.emit(this.dia);
  }

  handleDeleteSerie(indexDelete: number): void {
    this.series.removeAt(indexDelete);
  }

}
