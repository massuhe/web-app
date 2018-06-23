import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionEjercicioComponent } from './gestion-ejercicio/gestion-ejercicio.component';
import { SharedModule } from '../shared/shared.module';
import { ListadoTiposEjercicioComponent } from './listado-tipos-ejercicio/listado-tipos-ejercicio.component';
import { ListadoEjerciciosComponent } from './listado-ejercicios/listado-ejercicios.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
  ],
  declarations: [GestionEjercicioComponent, ListadoTiposEjercicioComponent, ListadoEjerciciosComponent]
})
export class EjerciciosModule { }
