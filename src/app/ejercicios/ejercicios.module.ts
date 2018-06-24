import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionEjercicioComponent } from './gestion-ejercicio/gestion-ejercicio.component';
import { SharedModule } from '../shared/shared.module';
import { ListadoTiposEjercicioComponent } from './listado-tipos-ejercicio/listado-tipos-ejercicio.component';
import { ListadoEjerciciosComponent } from './listado-ejercicios/listado-ejercicios.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EjerciciosService } from './_services/ejercicios.service';
import { AgregarEjercicioComponent } from './agregar-ejercicio/agregar-ejercicio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarTipoEjercicioComponent } from './agregar-tipo-ejercicio/agregar-tipo-ejercicio.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDatatableModule,
  ],
  providers: [EjerciciosService],
  declarations: [GestionEjercicioComponent, ListadoTiposEjercicioComponent, ListadoEjerciciosComponent, AgregarEjercicioComponent, AgregarTipoEjercicioComponent]
})
export class EjerciciosModule { }
