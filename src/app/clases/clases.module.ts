import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ListadoClasesComponent } from './listado-clases/listado-clases.component';
import { WeekSelectorComponent } from './week-selector/week-selector.component';
import { ClasesService } from './services/clases.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateFRParserFormatter } from './../core/ngb-date-fr-parser-formatter';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  declarations: [ListadoClasesComponent, WeekSelectorComponent],
  providers: [ClasesService, {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class ClasesModule { }
