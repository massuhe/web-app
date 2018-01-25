import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { Subscriber } from 'rxjs/Subscriber';

const errorMessages = {
  'required': 'El campo es requerido',
  'pattern': 'Debe ingresar una hora válida en formato HH:mm'
};

@Component({
  selector: 'app-rango-horario-input',
  templateUrl: './rango-horario-input.component.html',
  styleUrls: ['./rango-horario-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RangoHorarioInputComponent implements OnInit {

  @Input() item: FormGroup;
  @Output() onDelete = new EventEmitter<number>();
  get horaDesde() { return this.item.get('horaDesde'); }
  get horaHasta() { return this.item.get('horaHasta'); }
  errors;
  private subscriptions;

  constructor() { }

  ngOnInit() {
    this.initErrors();
    const controls = Object.keys(this.item.controls).map(cKey => ({key: cKey, control: this.item.get(cKey)}));
    this.subscriptions = controls.map((c: {key: string, control: FormControl}) =>
      c.control.statusChanges.subscribe(_ => {
        this.errors[c.key] = this.checkErrors(c.control.errors);
    }));
  }

  deleteItem(index) {
    this.subscriptions.forEach((s: Subscriber<any>) => s.unsubscribe());
    this.onDelete.emit(index);
  }

  private checkErrors(errors: ValidationErrors) {
    return errors ? Object.keys(errors).map(e => errorMessages[e]) : [];
  }

  private initErrors() {
    this.errors = Object.keys(this.item.controls).reduce((pv: any, cv) => ({...pv, [cv]: []}), {});
  }
}
