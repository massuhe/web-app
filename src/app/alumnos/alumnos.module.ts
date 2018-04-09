import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoAlumnosComponent } from './listado-alumnos/listado-alumnos.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AgregarAlumnoComponent } from './agregar-alumno/agregar-alumno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AgregarClasesComponent } from './agregar-alumno/agregar-clases/agregar-clases.component';
import { SeleccionarClaseComponent } from './agregar-alumno/seleccionar-clase/seleccionar-clase.component';
import { FilterAlumnosComponent } from './listado-alumnos/filter-alumnos/filter-alumnos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterAlumnoCardComponent } from './listado-alumnos/filter-alumno-card/filter-alumno-card.component';
import { ReporteIngresosAlumnosComponent } from './reporte-ingresos-alumnos/reporte-ingresos-alumnos.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    NgxDatatableModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgxChartsModule
  ],
  declarations: [
    ListadoAlumnosComponent,
    AgregarAlumnoComponent,
    AgregarClasesComponent,
    SeleccionarClaseComponent,
    FilterAlumnosComponent,
    FilterAlumnoCardComponent,
    ReporteIngresosAlumnosComponent
  ]
})
export class AlumnosModule {}
