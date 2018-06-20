import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil-alumno-data',
  templateUrl: './perfil-alumno-data.component.html',
  styleUrls: ['./perfil-alumno-data.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PerfilAlumnoDataComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() editMode: boolean;
  @Output() onGuardar = new EventEmitter<boolean>();
  @Output() onCancelar = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
