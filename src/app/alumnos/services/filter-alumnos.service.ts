import { Injectable } from '@angular/core';
import { FilterMode } from '../_constants/FilterMode';
import { Alumno } from '../models/alumno';

@Injectable()
export class FilterAlumnosService {
  private baseProps: any;

  constructor() {}

  initBaseProps(idTemplate) {
    this.baseProps = [
      {
        prop: 'id',
        name: '#',
        maxWidth: 50,
        cellTemplate: idTemplate
      },
      { prop: 'nombre', maxWidth: 200 },
      { prop: 'apellido', maxWidth: 200 }
    ];
  }

  getColumns(filter: number, templates?: any) {
    switch (filter) {
      case FilterMode.Todos:
        return [
          ...this.baseProps,
          { prop: 'activo', width: 100 },
          {
            name: 'Acciones',
            cellTemplate: templates.acciones.cellTemplate,
            maxWidth: 200
          }
        ];
      case FilterMode.Deudores:
        return [
          ...this.baseProps,
          {
            prop: 'deudas',
            cellTemplate: templates.debe.cellTemplate,
            sortable: false
          },
          {
            name: 'Acciones',
            cellTemplate: templates.acciones.cellTemplate,
            maxWidth: 160
          }
        ];
    }
  }

  getRows(alumnos: Alumno[], filter: number, filterText = '') {
    switch (filter) {
      case FilterMode.Todos:
        return alumnos
          .filter(a => this.nameFilter(a, filterText))
          .map(a => ({...a, activo: a.activo ? 'Si' : 'No'}));
      case FilterMode.Deudores:
        return alumnos.filter(
          a => !!a.deudas && this.nameFilter(a, filterText)
        );
    }
  }

  private nameFilter(alumno: Alumno, filterText: string): boolean {
    const upperFilterText = filterText.toUpperCase();
    return alumno.nombre.toUpperCase().includes(upperFilterText) ||
           alumno.apellido.toUpperCase().includes(upperFilterText);
  }
}
