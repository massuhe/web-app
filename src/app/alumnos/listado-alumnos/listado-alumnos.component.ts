import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../services/alumnos.service';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: [
    './listado-alumnos.component.scss',
    '../../../assets/scss/components/_buttons.scss'],
  providers: [
    AlumnosService
  ]
})
export class ListadoAlumnosComponent implements OnInit {

  private alumnos;
  rows;
  columns;

  constructor(private alumnosService: AlumnosService) {
    this.alumnos = [];
    this.rows = [];
    this.columns = [
      { prop: 'id', name: '#'},
      { prop: 'nombre' },
      { prop: 'apellido' },
      { prop: 'activo' },
      { name: 'Acciones' }
    ];
  }

  ngOnInit() {
    this.alumnosService.getAlumnos().subscribe( alumnos => {
      this.alumnos = alumnos.usuarios;
      this.rows = this.alumnos.slice();
    });
  }

}
