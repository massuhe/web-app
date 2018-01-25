import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDia } from '../../interfaces/IDia';

@Component({
  selector: 'app-agregar-dia-suspension-form',
  templateUrl: './agregar-dia-suspension-form.component.html',
  styleUrls: ['./agregar-dia-suspension-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarDiaSuspensionFormComponent implements OnInit {

  @Input() dias: IDia[];
  @Output() onAddDia = new EventEmitter<IDia>();
  @Output() onDeleteDia = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  handleAddDia(dia: IDia) {
    this.onAddDia.emit(dia);
  }

  handleDeleteDia(indexDelete: number) {
    this.onDeleteDia.emit(indexDelete);
  }

}
