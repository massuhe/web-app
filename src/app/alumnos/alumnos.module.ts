import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoAlumnosComponent } from './listado-alumnos/listado-alumnos.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [ListadoAlumnosComponent]
})
export class AlumnosModule { }
