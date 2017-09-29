import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoAlumnosComponent } from './listado-alumnos/listado-alumnos.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AgregarAlumnoComponent } from './agregar-alumno/agregar-alumno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ListadoAlumnosComponent, AgregarAlumnoComponent]
})
export class AlumnosModule { }
