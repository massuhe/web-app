import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionRutinaComponent } from './gestion-rutina/gestion-rutina.component';
import { SharedModule } from '../shared/shared.module';
import { GestionDiaRutinaComponent } from './gestion-rutina/gestion-dia-rutina/gestion-dia-rutina.component';
import { GestionSerieRutinaComponent } from './gestion-rutina/gestion-serie-rutina/gestion-serie-rutina.component';
import { ItemSerieRutinaComponent } from './gestion-rutina/item-serie-rutina/item-serie-rutina.component';
import { RutinaService } from './_services/rutina.service';
import { AgregarRutinaComponent } from './agregar-rutina/agregar-rutina.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarDiaRutinaComponent } from './agregar-rutina/agregar-dia-rutina/agregar-dia-rutina.component';
import { AgregarSerieRutinaComponent } from './agregar-rutina/agregar-serie-rutina/agregar-serie-rutina.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListadoEjerciciosSerieComponent } from './agregar-rutina/listado-ejercicios-serie/listado-ejercicios-serie.component';
import { AgregarItemSerieComponent } from './agregar-rutina/agregar-item-serie/agregar-item-serie.component';
import { AgregarEjercicioModalComponent } from './agregar-rutina/agregar-ejercicio-modal/agregar-ejercicio-modal.component';
import { EjerciciosService } from '../ejercicios/_services/ejercicios.service';
import { routing } from './rutinas.routing';
import { CargarDetallesRutinaComponent } from './cargar-detalles-rutina/cargar-detalles-rutina.component';
import { CargarDetallesSerieComponent } from './cargar-detalles-rutina/cargar-detalles-serie/cargar-detalles-serie.component';
import { CargarDetallesItemComponent } from './cargar-detalles-rutina/cargar-detalles-item/cargar-detalles-item.component';

@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [
    GestionRutinaComponent,
    GestionDiaRutinaComponent,
    GestionSerieRutinaComponent,
    ItemSerieRutinaComponent,
    AgregarRutinaComponent,
    AgregarDiaRutinaComponent,
    AgregarSerieRutinaComponent,
    ListadoEjerciciosSerieComponent,
    AgregarItemSerieComponent,
    AgregarEjercicioModalComponent,
    CargarDetallesRutinaComponent,
    CargarDetallesSerieComponent,
    CargarDetallesItemComponent
  ],
  providers: [RutinaService, EjerciciosService]
})
export class RutinasModule {}
