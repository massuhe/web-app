import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { ClasesService } from '../services/clases.service';
import { ActividadesService } from '../../actividades/services/actividades.service';
import { DialogService } from '../../core/dialog.service';
import * as startOfWeek from 'date-fns/start_of_week';
import { mergeMap, tap } from 'rxjs/operators';
import { GestionClasesComponent } from '../../clases/gestion-clases/gestion-clases.component';
import { Clase } from '../models/clase';
import { Dia } from '../models/dia';
import { Actividad } from '../../actividades/models/Actividad';

@Component({
  selector: 'app-listado-clases',
  templateUrl: './listado-clases.component.html',
  styleUrls: ['./listado-clases.component.scss']
})
export class ListadoClasesComponent implements OnInit {
  @ViewChild(GestionClasesComponent) gestionClases;
  @ViewChild('sched') scheduler;

  horas: string[];
  dias: Dia[];
  actividades: Actividad[];
  week: Date;
  busquedaAlumno: string;
  actividadSeleccionada: Actividad;
  showScheduler: boolean;
  showLoader: boolean;
  showScreen: boolean;

  fechaModal: Date;
  horaModal: string;
  claseSeleccionada: number;

  constructor(
    private clasesService: ClasesService,
    private actividadesService: ActividadesService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.showLoader = true;
    this.week = startOfWeek(new Date(), { weekStartsOn: 1 });
    this.busquedaAlumno = '';
    this.actividadesService
      .getActividadesHoraLimite()
      .pipe(
        tap(acts => this.setActividades(acts)),
        mergeMap(_ =>
          this.clasesService.getListadoClases(
            this.week,
            this.actividadSeleccionada
          )
        )
      )
      .subscribe(
        res => this.populateScheduler(res),
        err => this.handleErrors(err)
      );
  }

  handleInput(value) {
    this.busquedaAlumno = value.toUpperCase();
    this.dias.forEach(d => {
      d.clases.forEach(c => {
        c.checkIncluyeAlumno(value);
      });
    });
  }

  handleWeekChange(week: Date) {
    this.week = week;
    this.showLoader = true;
    this.getClases();
  }

  handleActivityChange(actividadId: number) {
    this.actividadSeleccionada = this.actividades.find(
      a => a.id === actividadId
    );
    this.showLoader = true;
    this.getClases();
  }

  show(dia: Dia, clase: Clase) {
    if (!clase.disabled) {
      this.fechaModal = dia.fecha;
      this.horaModal = clase.horaInicio;
      this.claseSeleccionada = clase.id;
      this.gestionClases.modal.show();
    }
  }

  handleSaveClase(updateStart) {
    if (updateStart) {
      this.showLoader = true;
    } else {
      this.showLoader = false;
      this.getClases(true);
    }
  }

  private populateScheduler(res, background = false) {
    if (res.dias.length > 0) {
      this.horas = res.horas;
      this.dias = res.dias;
      this.showScheduler = true;
    } else {
      this.horas = [];
      this.dias = [];
      this.showScheduler = false;
    }
    this.showLoader = false;
    this.showScreen = true;
    if (background) {
      setTimeout(() => this.scheduler.adjustHeight(false));
    }
  }

  private handleErrors(err) {
    this.showLoader = false;
    this.dialogService.error('Se ha producido un error inesperado');
  }

  private getClases(background = false) {
    this.clasesService
      .getListadoClases(this.week, this.actividadSeleccionada)
      .subscribe(
        res => this.populateScheduler(res, background),
        err => this.handleErrors(err)
      );
  }

  private setActividades(a) {
    this.actividades = a;
    this.actividadSeleccionada = a[0];
  }
}
