import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-perfil-alumno-actions',
  templateUrl: './perfil-alumno-actions.component.html',
  styleUrls: ['./perfil-alumno-actions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PerfilAlumnoActionsComponent implements OnInit {

  @Output() onEditarDatos = new EventEmitter<boolean>();
  @Output() onCambiarContrasena = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
