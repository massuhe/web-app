import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoRolesComponent } from './listado-roles/listado-roles.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AgregarRolComponent } from './agregar-rol/agregar-rol.component';

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
  declarations: [ListadoRolesComponent, AgregarRolComponent]
})
export class SeguridadModule { }
