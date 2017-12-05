import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ListadoClasesComponent } from './listado-clases/listado-clases.component';
import { ListadoClasesAlumnoComponent } from './listado-clases-alumno/listado-clases-alumno.component';
import { GestionClasesComponent } from './gestion-clases/gestion-clases.component';
import { WeekSelectorComponent } from './week-selector/week-selector.component';
import { ClasesService } from './services/clases.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { NgbDateFRParserFormatter } from './../core/ngb-date-fr-parser-formatter';
import { AsistenciaAlumnoItemComponent } from './gestion-clases/asistencia-alumno-item/asistencia-alumno-item.component';
import { AgregarAlumnoClaseComponent } from './gestion-clases/agregar-alumno-clase/agregar-alumno-clase.component';
import { GestionClaseHeaderComponent } from './gestion-clases/gestion-clase-header/gestion-clase-header.component';
import { GestionClaseBodyComponent } from './gestion-clases/gestion-clase-body/gestion-clase-body.component';
import { AlumnosService } from '../alumnos/services/alumnos.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule.forRoot(),
    FormsModule,
    NguiAutoCompleteModule
  ],
  declarations: [ListadoClasesComponent, WeekSelectorComponent, ListadoClasesAlumnoComponent,
    GestionClasesComponent, AsistenciaAlumnoItemComponent, AgregarAlumnoClaseComponent,
    GestionClaseHeaderComponent, GestionClaseBodyComponent],
  providers: [ClasesService, AlumnosService, {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}],
  exports: [/*GestionClasesComponent, AsistenciaAlumnoItemComponent, AgregarAlumnoClaseComponent*/]
})
export class ClasesModule { }
