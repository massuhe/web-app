import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Alumno } from '../../../alumnos/models/alumno';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-agregar-alumno-clase',
  templateUrl: './agregar-alumno-clase.component.html',
  styleUrls: ['./agregar-alumno-clase.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarAlumnoClaseComponent implements OnInit {

  @ViewChild('inputAutoComplete') input;
  @Input() deshabilitarAgregar: boolean;
  @Output() onAddAlumno = new EventEmitter<Alumno>();
  toggle;
  myData;
  mySource;
  noMatchText;

  constructor(private alumnosService: AlumnosService) { }

  ngOnInit() {
    this.myData = undefined;
  }

  observableSource = (keyword: any): Observable<Alumno[]> => {
    if (keyword) {
      return this.alumnosService.getAlumnos(keyword, true);
    } else {
      return of([]);
    }
  }

  addAlumno(alumno: Alumno) {
    if (alumno instanceof Alumno) {
      this.onAddAlumno.emit(alumno);
    }
    this.myData = undefined;
  }

  formatList(data: Alumno): string {
    return `${data.nombre} ${data.apellido}`;
  }

  handleClick() {
    this.toggle = !this.toggle;
  }

}
