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

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ListadoAlumnosComponent, AgregarAlumnoComponent, AgregarClasesComponent, SeleccionarClaseComponent]
})
export class AlumnosModule { }
