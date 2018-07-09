import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionNovedadesComponent } from './gestion-novedades/gestion-novedades.component';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgregarNovedadComponent } from './agregar-novedad/agregar-novedad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NovedadService } from './_services/novedad.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ],
  declarations: [GestionNovedadesComponent, AgregarNovedadComponent],
  providers: [NovedadService]
})
export class NovedadesModule { }
