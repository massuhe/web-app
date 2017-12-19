import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Actividad } from '../models/Actividad';
import DiaActividad from '../models/DiaActividad';
import { ValidacionService } from '../../core/validacion.service';
import { FormGroup } from '@angular/forms';
import { DialogService } from '../../core/dialog.service';
import { ActividadesService } from '../services/actividades.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

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
  sub;
  editar: boolean;

  constructor(private actividadesService: ActividadesService,
    public validationService: ValidacionService, private dialogService: DialogService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.showLoader = true;
    this.defineMode();
    this.fetchActividad();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submitForm(form: FormGroup) {
    if (form.valid) {
      this.dialogService.confirm('La actividad será guardada. ¿Desea continuar?')
        .then(_ => {
          this.showLoader = true;
          this.editar ? this.updateActividad(form) : this.storeActividad(form);
        });
    } else {
      this.validationService.showErrors(form);
    }
  }

  handleActividadChange(actividad: Actividad) {
    this.actividad = actividad;
  }

  private updateActividad(form) {
    const actividadUpdated = { ...form.value, diasHorarios: this.actividad.diasHorarios };
    this.actividadesService
      .put(this.actividad.id, actividadUpdated)
      .subscribe(this.onSuccess.bind(this)(), this.onError.bind(this));
  }

  private storeActividad(form) {
    const nuevaActividad = { ...form.value, diasHorarios: this.actividad.diasHorarios };
    this.actividadesService
      .post(nuevaActividad)
      .subscribe(this.onSuccess.bind(this)(form), this.onError.bind(this));
  }

  private defineMode() {
    this.route.url.subscribe(url => {
      this.editar = url[1].path === 'editar' ? true : false;
    });
  }

  private fetchActividad() {
    this.sub = this.route.params.pipe(switchMap(p => this.getActividad(+p['idActividad'])))
      .subscribe((actividad: Actividad) => {
        this.actividad = actividad;
        this.showLoader = false;
      }, err => {
        this.dialogService.error('Se ha producido un error inesperado');
        this.showLoader = false;
      });
  }

  private getActividad(idActividad) {
    if (idActividad) {
      return this.actividadesService.getById(idActividad);
    } else {
      return of(new Actividad());
    }
  }

  private onSuccess(form?: FormGroup) {
    return suc => {
      this.dialogService.success('La actividad se ha guardado correctamente');
      this.showLoader = false;
      if (form) {
        this.actividad = new Actividad();
        form.reset();
      }
    };
  }

  private onError(form: FormGroup) {
    this.dialogService.error('Se ha producido un error inesperado');
    this.showLoader = false;
  }

}
