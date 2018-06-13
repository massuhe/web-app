import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { FormControl } from '@angular/forms';
import { MENSAJES_FILTRAR_PAGO } from '../../_constants/buscar-pago';
import { IFiltroAlumnoFechas } from '../../_interfaces/IFiltroAlumnoFechas';

@Component({
  selector: 'app-filtro-pagos-alumno-fecha',
  templateUrl: './filtro-pagos-alumno-fecha.component.html',
  styleUrls: ['./filtro-pagos-alumno-fecha.component.scss']
})
export class FiltroPagosAlumnoFechaComponent implements OnInit {

  alumnosItems : string[];
  mapAlumnosIds : any[];
  alumno : string;
  alumnoFormControl: FormControl;
  fechaDesde: FormControl;
  fechaHasta: FormControl;
  mensajeBusqueda: any;
  idAlumno: number;
  @Output() onSearch = new EventEmitter<IFiltroAlumnoFechas>();

  constructor(
    private alumnosService: AlumnosService    
  ) { }

  ngOnInit() {
    this.alumnoFormControl = new FormControl({value: '', disabled: true});
    this.fechaDesde = new FormControl();
    this.fechaHasta = new FormControl();
    this.alumnosService.getAlumnos().subscribe(
      alumnos => {
        this.mapAlumnosIds = alumnos.map(a => ({key: a.id, name: a.fullName}));
        this.alumnosItems = alumnos.map(a => (a.fullName));
        this.alumnoFormControl.enable();
      }
    );
    this.mensajeBusqueda = null;
  }

  handleClick() {
    if (this.formularioInvalido()) { return; }
    let filtroAlumnoFechas : IFiltroAlumnoFechas = {
      idAlumno: this.idAlumno,
      fechaDesde: this.fechaDesde.value,
      fechaHasta: this.fechaHasta.value
    }
    this.onSearch.emit(filtroAlumnoFechas);
  }

  private formularioInvalido() : boolean {
    let todosVacios = this.todosVacios();
    let algunoInvalido = this.algunoInvalido();
    return todosVacios || algunoInvalido;
  }

  private todosVacios() : boolean {
    if (!this.alumno && !this.fechaDesde.value && !this.fechaHasta.value) {
      this.mensajeBusqueda = MENSAJES_FILTRAR_PAGO.busqueda;
      return true;
    }
    this.mensajeBusqueda = null;
    return false;
  }

  private algunoInvalido() : boolean {
    let invalido = false;
    if (!this.validarAlumnoYSetear()) { invalido = true; }
    if (!this.validarFechasYSetear()) { invalido = true; }
    return invalido;
  }

  private validarAlumnoYSetear() : boolean {
    if (!this.alumno) {
      this.idAlumno = null;
      return true;
    }
    let itemMatched: string = this.alumnosItems.find(a => (a.toLowerCase() === this.alumno.toLowerCase()));
    if (!itemMatched) {
      this.alumnoFormControl.setErrors(MENSAJES_FILTRAR_PAGO.alumno);
      return false;
    }
    let alumnoConId: any = this.mapAlumnosIds.find(a => (a.name === itemMatched));
    this.idAlumno = alumnoConId.key;
    return true;
  }

  private validarFechasYSetear() : boolean {
    if (!this.fechaDesde.value && !this.fechaHasta.value) { return true; }
    let validas = true;
    if (!this.fechaDesde.value) {
      const {ambasRequired, ..._r2} = MENSAJES_FILTRAR_PAGO.fecha;
      this.fechaDesde.setErrors({ ambasRequired });
      validas = false;
    } else if (isNaN(this.fechaDesde.value.getTime())) {
      const {invalido, ..._} = MENSAJES_FILTRAR_PAGO.fecha;
      this.fechaDesde.setErrors({ invalido });
      validas = false;
    }
    if (this.fechaHasta.value && isNaN(this.fechaHasta.value.getTime())) {
      const {invalido, ..._} = MENSAJES_FILTRAR_PAGO.fecha;
      this.fechaHasta.setErrors({ invalido });
      validas = false;
    }
    return validas;
  }

}
