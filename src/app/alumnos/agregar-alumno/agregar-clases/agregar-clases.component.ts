import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Clase } from '../../../clases/models/clase';

@Component({
  selector: 'app-agregar-clases',
  templateUrl: './agregar-clases.component.html',
  styleUrls: ['./agregar-clases.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarClasesComponent implements OnInit {

  @Input() clases: Clase[];
  @Output() onSelectClase = new EventEmitter<Clase>();
  @Output() onDeleteClase = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  handleSelectClase(clase: Clase) {
    this.onSelectClase.emit(clase);
  }

  deleteClase(indexClase: number) {
    this.onDeleteClase.emit(indexClase);
  }

}
