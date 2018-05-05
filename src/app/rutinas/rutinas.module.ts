import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionRutinaComponent } from './gestion-rutina/gestion-rutina.component';
import { SharedModule } from '../shared/shared.module';
import { GestionDiaRutinaComponent } from './gestion-rutina/gestion-dia-rutina/gestion-dia-rutina.component';
import { GestionSerieRutinaComponent } from './gestion-rutina/gestion-serie-rutina/gestion-serie-rutina.component';
import { ItemSerieRutinaComponent } from './gestion-rutina/item-serie-rutina/item-serie-rutina.component';
import { RutinaService } from './_services/rutina.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [GestionRutinaComponent, GestionDiaRutinaComponent, GestionSerieRutinaComponent, ItemSerieRutinaComponent],
  providers: [RutinaService]
})
export class RutinasModule { }
