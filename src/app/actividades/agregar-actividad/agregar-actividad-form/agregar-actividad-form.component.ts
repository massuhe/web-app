import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Actividad } from '../../models/Actividad';
import { ESTRUCTURA_AGREGAR_ACTIVIDAD, MENSAJES_AGREGAR_ACTIVIDAD } from '../../_constants/agregar-actividad';
import { ValidacionService } from '../../../core/validacion.service';
import DiaActividad from '../../models/DiaActividad';

@Component({
  selector: 'app-agregar-actividad-form',
  templateUrl: './agregar-actividad-form.component.html',
  styleUrls: ['./agregar-actividad-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AgregarActividadFormComponent implements OnInit, OnChanges {

  @Output() onChangeActividad = new EventEmitter<Actividad>();
  @Input() actividad: Actividad;
  form: FormGroup;
  errors;

  constructor(private formBuilder: FormBuilder, private validationService: ValidacionService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ['', { updateOn: 'blur', validators: [Validators.required] }],
      duracion: ['', { updateOn: 'blur', validators: [Validators.required, Validators.pattern(/^\d+$/)] }],
      cantidadAlumnosPorClase: ['', { updateOn: 'blur', validators: [Validators.required, Validators.pattern(/^\d+$/)] }],
      descripcion: ['']
    });
    this.initializeValidationService();
  }

  ngOnChanges(changes) {
    const { currentValue, previousValue } = changes.actividad;
    if (currentValue && currentValue.id && (!previousValue || currentValue.id !== previousValue.id)) {
      this.form.setValue({
        nombre: currentValue.nombre,
        duracion: currentValue.duracion,
        cantidadAlumnosPorClase: currentValue.cantidadAlumnosPorClase,
        descripcion: currentValue.descripcion
      });
    }
  }

  handleDiasHorariosChange(diasHorarios: DiaActividad[]) {
    const newActividad = { ...this.actividad, diasHorarios };
    this.onChangeActividad.emit(newActividad);
  }

  private initializeValidationService() {
    this.validationService.inicializa(ESTRUCTURA_AGREGAR_ACTIVIDAD, MENSAJES_AGREGAR_ACTIVIDAD);
    this.validationService.getErrorsObservable(this.form)
      .subscribe(newErrors => {
        this.errors = newErrors;
      });
  }

}
