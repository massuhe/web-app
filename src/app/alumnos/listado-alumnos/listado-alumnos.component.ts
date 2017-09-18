import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: [
    './listado-alumnos.component.scss',
    '../../../assets/scss/components/_buttons.scss']
})
export class ListadoAlumnosComponent implements OnInit {

  rows = [
    { id: 1, nombre: 'Cosme', apellido: 'Fulanito', activo: 'Si'}
  ];
  columns = [
    { prop: 'id', name: '#'},
    { prop: 'nombre' },
    { prop: 'apellido' },
    { prop: 'activo' },
    { name: 'Acciones' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
