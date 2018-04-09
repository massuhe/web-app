import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FRECUENCIAS, MAX_CHART_WIDTH } from '../_constants/reporte-ingreso';
import { TimezoneFixer } from '../../shared/_utils/TimezoneFixer';
import { AlumnosService } from '../services/alumnos.service';
import { IReporte } from '../_interfaces/IReporte';

@Component({
  selector: 'app-reporte-ingresos-alumnos',
  templateUrl: './reporte-ingresos-alumnos.component.html',
  styleUrls: ['./reporte-ingresos-alumnos.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ReporteIngresosAlumnosComponent implements OnInit {

  form: FormGroup;
  view: [number, number];
  data = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  frecuencias: {key: number, name: string}[];

  constructor(private formBuilder: FormBuilder, private alumnosService: AlumnosService) {

  }

  ngOnInit() {
    this.frecuencias = FRECUENCIAS;
    this.form = this.formBuilder.group({
      fechaDesde: [],
      fechaHasta: [],
      frecuencia: [0]
    });
    this.view = [300, 500];
  }

  handleSearch(): void {
    const fechaDesde = this.form.get('fechaDesde').value;
    const fechaHasta = this.form.get('fechaHasta').value;
    const frecuencia = this.form.get('frecuencia').value;
    this.alumnosService.reporte(fechaDesde, fechaHasta, frecuencia).subscribe(
      (reportes: IReporte[]) => this.handleSuccessSearchReportes(reportes),
      error => console.log(error)
    );
  }

  handleSuccessSearchReportes(reportes: IReporte[]): void {
    this.data = reportes.map(r => ({name: r.fecha, value: r.cantidad}));
    const idealWidth = this.data.length * 150;
    this.view = [idealWidth > MAX_CHART_WIDTH ? MAX_CHART_WIDTH : idealWidth, 500];
  }

}
