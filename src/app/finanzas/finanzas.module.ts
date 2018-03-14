import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RegistrarPagoComponent } from './registrar-pago/registrar-pago.component';
import { AlumnosService } from '../alumnos/services/alumnos.service';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { BuscarPagoComponent } from './registrar-pago/buscar-pago/buscar-pago.component';
import { CuotasService } from './_services/cuotas.service';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NguiAutoCompleteModule
  ],
  declarations: [ RegistrarPagoComponent, BuscarPagoComponent ],
  providers: [ AlumnosService, CuotasService ]
})
export class FinanzasModule { }