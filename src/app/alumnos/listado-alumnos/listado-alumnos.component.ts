import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlumnosService } from '../services/alumnos.service';
import { Alumno } from '../models/alumno';

const mockRows = [
  {id: 1, nombre: 'Juan', apellido: 'Perez', activo: 'Sí'},
  {id: 2, nombre: 'Juan', apellido: 'Perez', activo: 'Sí'},
  {id: 3, nombre: 'Juan', apellido: 'Perez', activo: 'Sí'},
  {id: 4, nombre: 'Juan', apellido: 'Perez', activo: 'Sí'},
  {id: 5, nombre: 'Juan', apellido: 'Perez', activo: 'Sí'},
  {id: 6, nombre: 'Juan', apellido: 'Perez', activo: 'Sí'},
  {id: 7, nombre: 'Juan', apellido: 'Perez', activo: 'Sí'},
  {id: 8, nombre: 'Juan', apellido: 'Perez', activo: 'Sí'},
  {id: 9, nombre: 'Juan', apellido: 'Perez', activo: 'Sí'},
  {id: 10, nombre: 'Juan', apellido: 'Perez', activo: 'Sí'},
  {id: 11, nombre: 'Juan', apellido: 'Perez', activo: 'Sí'},
  {id: 12, nombre: 'Juan', apellido: 'Perez', activo: 'Sí'},
  {id: 13, nombre: 'Juan', apellido: 'Perez', activo: 'Sí'}
];

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: [
    './listado-alumnos.component.scss'
  ],
  providers: [
    AlumnosService
  ]
})
export class ListadoAlumnosComponent implements OnInit {

  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
  private alumnos;
  rows;
  columns;

  constructor(private alumnosService: AlumnosService) {

  }

  ngOnInit() {
    this.alumnos = [];
    this.rows = [];
    this.columns = [
      { prop: 'id', name: '#', width: 50},
      { prop: 'nombre' },
      { prop: 'apellido' },
      { prop: 'activo', width: 100 },
      { name: 'Acciones', cellTemplate: this.editTmpl, headerTemplate: this.hdrTpl, maxWidth: 160}
    ];
    this.alumnosService.getAlumnos().subscribe( alumnos => {
      this.alumnos = alumnos;
      this.rows = this.alumnos.slice().map((a) => {
        a.activo = a.activo ? 'Si' : 'No';
        return a;
      });
    });
  }

  filterData(event) {
    const filterText = event.srcElement.value.toUpperCase();
    this.rows = this.alumnos.filter(a => a.nombre.toUpperCase().includes(filterText) || a.apellido.toUpperCase().includes(filterText));
  }
}
