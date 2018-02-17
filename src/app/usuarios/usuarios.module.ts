import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { UsuariosService } from './_services/usuarios.service';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { SeguridadService } from '../seguridad/_services/seguridad.service';
import { ValidacionService } from '../core/validacion.service';

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
  declarations: [ListadoUsuariosComponent, AgregarUsuarioComponent],
  providers: [UsuariosService, SeguridadService, ValidacionService]
})
export class UsuariosModule { }
