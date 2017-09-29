import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlumnosService } from '../services/alumnos.service';
import { Alumno } from '../models/alumno';

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
      { name: 'Acciones', width: 175, cellTemplate: this.editTmpl, headerTemplate: this.hdrTpl}
    ];
    this.alumnosService.getAlumnos().subscribe( alumnos => {
      this.alumnos = alumnos;
      this.rows = this.alumnos.slice().map((a) => {
        a.activo = a.activo ? 'Si' : 'No';
        return a;
      });
    });
  }

}
