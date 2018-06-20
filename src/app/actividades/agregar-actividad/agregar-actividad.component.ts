import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Actividad } from '../models/Actividad';
import DiaActividad from '../models/DiaActividad';
import { ValidacionService } from '../../core/validacion.service';
import { FormGroup } from '@angular/forms';
import { DialogService } from '../../core/dialog.service';
import { ActividadesService } from '../services/actividades.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import AppMessages from '../../_utils/AppMessages';
import { GUARDAR, GENERIC_ERROR_MESSAGE, ENTIDADES } from '../../app-constants';

@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ValidacionService]
})
export class AgregarActividadComponent implements OnInit, OnDestroy {
  actividad: Actividad;
  showLoader: boolean;
  editar: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private actividadesService: ActividadesService,
    public validationService: ValidacionService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.showLoader = true;
    this.defineMode();
    this.fetchActividad();
  }

  submitForm(form: FormGroup) {
    if (form.valid) {
      this.dialogService.confirm(AppMessages.confirm(ENTIDADES.ACTIVIDAD, GUARDAR, true, false)).then(
        ok => {
          this.showLoader = true;
          const $actividad = this.editar ?
            this.updateActividad(form)
            : this.storeActividad(form);
          $actividad.pipe(
            finalize(() => this.showLoader = false),
            takeUntil(this.destroy$)
          )
          .subscribe(
            this.onSuccess.bind(this)(GUARDAR),
            this.onError.bind(this)
          );
        },
        cancel => {}
      );
    } else {
      this.validationService.showErrors(form);
    }
  }

  handleActividadChange(actividad: Actividad) {
    this.actividad = actividad;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private updateActividad(form) {
    const actividadUpdated = {
      ...form.value,
      diasHorarios: this.actividad.diasHorarios
    };
    return this.actividadesService.put(this.actividad.id, actividadUpdated);
  }

  private storeActividad(form) {
    const nuevaActividad = {
      ...form.value,
      diasHorarios: this.actividad.diasHorarios
    };
    return this.actividadesService.post(nuevaActividad);
  }

  private defineMode() {
    this.route.url.subscribe(url => {
      this.editar = url[1].path === 'editar' ? true : false;
    });
  }

  private fetchActividad() {
    this.route.params
      .pipe(
        switchMap(p => this.getActividad(+p['idActividad'])),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (actividad: Actividad) => this.successFetchActividad(actividad),
        res => this.onError(res)
      );
  }

  private successFetchActividad(actividad): void {
    this.actividad = actividad;
    this.showLoader = false;
  }

  private getActividad(idActividad) {
    if (idActividad) {
      return this.actividadesService.getById(idActividad);
    } else {
      return of(new Actividad());
    }
  }

  private onSuccess(accion: string) {
    return suc => {
      this.dialogService
        .success(AppMessages.success(ENTIDADES.ACTIVIDAD, accion))
        .then(_ => {
          if (!this.editar) {
            this.router.navigate(['/actividades']);
          }
        });
    };
  }

  private onError(res) {
    this.dialogService.error(AppMessages.error(res));
    this.showLoader = false;
  }
}
