import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { MULTISELECT_TEXTS, MULTISELECT_SETTINGS } from '../../../app-constants';
import { FormGroup } from '@angular/forms';
import { IDia } from '../../interfaces/IDia';
import { Subscription } from 'rxjs/Subscription';
import { Actividad } from '../../../actividades/models/Actividad';

@Component({
  selector: 'app-agregar-set-form',
  templateUrl: './agregar-set-form.component.html',
  styleUrls: ['./agregar-set-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarSetFormComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() dias: IDia[];
  @Input() errors: any;
  @Input() options: IMultiSelectOption[];
  @Output() onAddDia = new EventEmitter<IDia>();
  @Output() onDeleteDia = new EventEmitter<number>();
  subscriptions: Subscription[];

  constructor() { }

  ngOnInit() {
    this.subscribeToValueChanges();
  }

  enableOrDisable(val, formName, disableValue): void {
      if (val === disableValue) {
        this.form.controls[formName].disable();
        this.form.patchValue({[formName]: null});
      } else {
        this.form.controls[formName].enable();
      }
  }

  handleAddDia(dia: IDia): void {
    this.onAddDia.emit(dia);
  }

  handleDeleteDia(dia: number): void {
    this.onDeleteDia.emit(dia);
  }

  private subscribeToValueChanges(): void {
    const s1 = this.form.get('accion').valueChanges.subscribe(val => {
      this.enableOrDisable(val, 'motivo', '0');
    });
    const s2 = this.form.get('indefinido').valueChanges.subscribe(val => {
      this.enableOrDisable(val, 'fechaHasta', true);
    });
    this.subscriptions = [s1, s2];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

}
