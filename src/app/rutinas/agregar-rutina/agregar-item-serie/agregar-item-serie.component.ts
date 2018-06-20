import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { RutinaFormCreator } from '../../_services/rutina-form-creator';

@Component({
  selector: 'app-agregar-item-serie',
  templateUrl: './agregar-item-serie.component.html',
  styleUrls: ['./agregar-item-serie.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarItemSerieComponent implements OnInit {

  @Input() item: FormGroup;
  @Input() disableMoveUp: boolean;
  @Input() disableMoveDown: boolean;
  @Input() set totalSemanas(value: number) {
    this.changeParametrosItem(value);
  }
  @Input() set parametroSemanaSelected(value: number) {
    this.changeParametroSemanaGroup(value);
  }
  @Input() set especificarPorSemana(value: boolean) {
    this.handleChangeEspecificarPorSemana(value);
  }
  @Output() onMoveUp = new EventEmitter<boolean>();
  @Output() onMoveDown = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<boolean>();

  parametroSemanaGroup: FormGroup;
  get parametrosSemana(): FormArray {
    return this.item.get('parametrosSemana') as FormArray;
  }
  get nombreEjercicio(): string {
    return this.item.get('nombreEjercicio').value;
  }
  private _parametroSemanaSelected: number;
  private _especificarPorSemana: boolean;
  private valueChange$;

  constructor() { }

  ngOnInit() {

  }

  private changeParametrosItem(semanas: number): void {
    const parametrosLength = this.parametrosSemana.length;
    if (parametrosLength > semanas) {
      for (let i = semanas ; i < parametrosLength ; i++) {
        this.parametrosSemana.removeAt(semanas);
      }
      return ;
    }
    if (parametrosLength < semanas) {
      const valueFirstParametro = this.parametrosSemana.controls[0].value;
      for (let i = parametrosLength; i < semanas ; i++) {
        this.parametrosSemana.push(RutinaFormCreator.getParametrosSemanaGroup({...valueFirstParametro, semana: i + 1}));
      }
      return ;
    }
  }

  private changeParametroSemanaGroup(value: number) {
    const parametro = Number(value);
    this.parametroSemanaGroup = this.parametrosSemana.controls[parametro - 1] as FormGroup;
    this._parametroSemanaSelected = parametro;
  }

  private handleChangeEspecificarPorSemana(especificarPorSemana: boolean): void {
    if (especificarPorSemana) {
      this.changeParametroSemanaGroup(this._parametroSemanaSelected);
      if (this.valueChange$) {
        this.valueChange$.unsubscribe();
      }
    } else {
      this.parametroSemanaGroup = this.parametrosSemana.controls[0] as FormGroup;
      this.updateRepeticionesExceptMain(this.parametroSemanaGroup.get('repeticiones').value);
      this.subscribeToMainParametroSemana();
    }
  }

  private subscribeToMainParametroSemana(): void {
    this.valueChange$ = this.parametroSemanaGroup.valueChanges.subscribe(values => {
      this.updateRepeticionesExceptMain(values.repeticiones);
    });
  }

  private updateRepeticionesExceptMain(repeticiones: string) {
    this.parametrosSemana.controls.forEach((c, i) => {
      if (i !== 0) {
        c.patchValue({repeticiones: repeticiones});
      }
    });
  }

}
