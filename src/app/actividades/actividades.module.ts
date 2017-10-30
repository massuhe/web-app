import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesService } from './services/actividades.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ActividadesService]
})
export class ActividadesModule { }
