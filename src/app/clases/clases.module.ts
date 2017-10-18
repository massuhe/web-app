import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ListadoClasesComponent } from './listado-clases/listado-clases.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ListadoClasesComponent]
})
export class ClasesModule { }
