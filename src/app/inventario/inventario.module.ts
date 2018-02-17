import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionInventarioComponent } from './gestion-inventario/gestion-inventario.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarInventarioComponent } from './agregar-inventario/agregar-inventario.component';
import { InventarioService } from './_services/inventario.service';

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
  declarations: [GestionInventarioComponent, AgregarInventarioComponent],
  providers: [InventarioService]
})
export class InventarioModule { }
