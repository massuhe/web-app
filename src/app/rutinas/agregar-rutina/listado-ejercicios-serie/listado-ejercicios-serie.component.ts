import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-listado-ejercicios-serie',
  templateUrl: './listado-ejercicios-serie.component.html',
  styleUrls: ['./listado-ejercicios-serie.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoEjerciciosSerieComponent implements OnInit {

  @Input() items: FormArray;
  @Input() totalSemanas: number;
  @Input() parametroSelected: number;
  @Input() especificarPorSemana: boolean;

  constructor() { }

  ngOnInit() {
  }

  handleDelete(indexDelete: number): void {
    this.items.removeAt(indexDelete);
  }

  handleMoveUp(indexMoveUp: number): void {
    const itemMove = this.items.controls[indexMoveUp];
    this.items.controls[indexMoveUp] = this.items.controls[indexMoveUp - 1];
    this.items.controls[indexMoveUp - 1] = itemMove;
    // this.items.removeAt(indexMoveUp);
    // this.items.insert(indexMoveUp - 1, itemMove);
  }

  handleMoveDown(indexMoveDown: number): void {
    const itemMove = this.items.controls[indexMoveDown];
    this.items.controls[indexMoveDown] = this.items.controls[indexMoveDown + 1];
    this.items.controls[indexMoveDown + 1] = itemMove;
  }

}
