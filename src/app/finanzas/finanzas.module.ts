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
import { BalanceGeneralComponent } from './balance-general/balance-general.component';
import { MovimientosFijosComponent } from './balance-general/movimientos-fijos/movimientos-fijos.component';
import { MovimientosService } from './_services/movimientos.service';
import { AgregarEditarMovimientoComponent } from './balance-general/agregar-editar-movimiento/agregar-editar-movimiento.component';
import { FlujoCajaComponent } from './balance-general/flujo-caja/flujo-caja.component';
import { PagosService } from './_services/pagos.service';
import { ListadoPagosComponent } from './listado-pagos/listado-pagos.component';
import { FiltroPagosCuotaMesComponent } from './listado-pagos/filtro-pagos-cuota-mes/filtro-pagos-cuota-mes.component';
import { FiltroPagosAlumnoFechaComponent } from './listado-pagos/filtro-pagos-alumno-fecha/filtro-pagos-alumno-fecha.component';

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
  declarations: [
    RegistrarPagoComponent,
    BuscarPagoComponent,
    ListadoPagosComponent,
    BalanceGeneralComponent,
    MovimientosFijosComponent,
    FiltroPagosCuotaMesComponent,
    FiltroPagosAlumnoFechaComponent,
    AgregarEditarMovimientoComponent,
    FlujoCajaComponent
  ],
  providers: [AlumnosService, CuotasService, MovimientosService, PagosService]
})
export class FinanzasModule {}
