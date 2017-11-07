import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasesModule } from '../clases/clases.module';

import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    ClasesModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
