import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesService } from './services/actividades.service';
import { ListadoActividadesComponent } from './listado-actividades/listado-actividades.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AgregarActividadComponent } from './agregar-actividad/agregar-actividad.component';
import { AgregarActividadFormComponent } from './agregar-actividad/agregar-actividad-form/agregar-actividad-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DiaHorarioFormComponent } from './agregar-actividad/dia-horario-form/dia-horario-form.component';
import { AgregarDiaComponent } from './agregar-actividad/agregar-dia/agregar-dia.component';
import { RangoHorarioInputComponent } from './agregar-actividad/rango-horario-input/rango-horario-input.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxDatatableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [ListadoActividadesComponent, AgregarActividadComponent, AgregarActividadFormComponent,
    DiaHorarioFormComponent, AgregarDiaComponent, RangoHorarioInputComponent],
  providers: [ActividadesService],
  exports: []
})
export class ActividadesModule { }
