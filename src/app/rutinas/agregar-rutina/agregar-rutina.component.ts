import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ITab } from '../../shared/tab-nav/ITab';
import { RutinaFormCreator } from '../_services/rutina-form-creator';
import { EjerciciosService } from '../../ejercicios/_services/ejercicios.service';
import { AgregarEjercicioModalComponent } from './agregar-ejercicio-modal/agregar-ejercicio-modal.component';
import { Ejercicio } from '../../ejercicios/_models/Ejercicio';
import { Router, ActivatedRoute } from '@angular/router';
import { RutinaService } from '../_services/rutina.service';
import { DialogService } from '../../core/dialog.service';
import AppMessages from '../../_utils/AppMessages';
import { GUARDAR, SUCCESS_MESSAGE, GENERIC_ERROR_MESSAGE, ENTIDADES } from '../../app-constants';
import { ValidacionService } from '../../core/validacion.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil, switchMap } from 'rxjs/operators';
import { ESTRUCTURA_AGREGAR_RUTINA, MENSAJES_AGREGAR_RUTINA } from '../_constants/agregar-rutina';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Rutina } from '../_models/rutina';
import { RutinaFormBuilder } from '../_services/rutina-form-builder';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-agregar-rutina',
  templateUrl: './agregar-rutina.component.html',
  styleUrls: ['./agregar-rutina.component.scss'],
  providers: [ValidacionService],
  encapsulation: ViewEncapsulation.None
})
export class AgregarRutinaComponent implements OnInit, OnDestroy {

  form: FormGroup;
  itemsDias: ITab[];
  activeSerie: FormGroup;
  diaActive: number;
  alumno: number;
  showLoader: boolean;
  showContent: boolean;
  get dias(): FormArray {
    return this.form.get('dias') as FormArray;
  }
  errors: any;
  editar: boolean;
  private destroy$ = new Subject<boolean>();

  @ViewChild(AgregarEjercicioModalComponent) modalAgregarEjercicio;

  constructor(
    private rutinaService: RutinaService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private validacionService: ValidacionService
  ) { }

  ngOnInit() {
    this.showLoader = true;
    this.form = this.builder.group({
      fechaInicio: [null, Validators.required],
      totalSemanas: [5],
      dias: this.builder.array([])
    });
    this.initData();
    this.diaActive = 0;
  }

  initData(): void {
    combineLatest(this.route.params, this.route.url)
    .pipe(
      switchMap(
        ([params, mode]) => this.fetchRutinaIfEditar(mode[0].path, Number(params['idAlumno'])),
        ([params, mode], data) => ({alumno: Number(params['idAlumno']), rutina: data['rutina']})
      ),
      takeUntil(this.destroy$)
    )
    .subscribe(
      data => this.successFetchData(data),
      error => this.handleError(error)
    );
  }

  fetchRutinaIfEditar(mode: string, idAlumno: number): Observable<Rutina | {}> {
    this.editar = mode === 'editar';
    return this.editar ? this.rutinaService.getRutina(idAlumno) : of({});
  }

  handleAgregarDia(): void {
    this.dias.push(RutinaFormCreator.getDiaRutinaGroup());
    this.itemsDias = this.dias.controls.map((_, i) => ({id: i, nombre: `Día ${i + 1}`}));
    this.diaActive = this.itemsDias.length - 1;
  }

  handleChangeDia(value: number): void {
    this.diaActive = value;
  }

  handleAgregarEjercicio(ejercicio: Ejercicio): void {
    const items = this.activeSerie.get('items') as FormArray;
    const itemSerie = RutinaFormCreator.getItemSerieGroup({
      ejercicio: ejercicio.id,
      nombreEjercicio: ejercicio.nombre
    });
    for (let i = 0 ; i < this.form.get('totalSemanas').value ; i++) {
      (<FormArray>itemSerie.get('parametrosSemana')).push(RutinaFormCreator.getParametrosSemanaGroup({semana: i + 1}));
    }
    items.push(itemSerie);
  }

  handleShowModal(activeSerie: FormGroup): void {
    this.activeSerie = activeSerie;
    this.modalAgregarEjercicio.modal.show();
  }

  handleHideModal(): void {
    this.activeSerie = undefined;
  }

  handleDeleteDia(dia: FormGroup): void {
    const index = this.dias.controls.indexOf(dia);
    this.dias.removeAt(index);
    this.itemsDias = this.dias.controls.map((_, i) => ({id: i, nombre: `Día ${i + 1}`}));
    this.diaActive = index === 0 ? 0 : index - 1;
  }

  handleGuardar(): void {
    if (!this.form.valid) {
      this.validacionService.recursiveMarkAsDirty(this.form);
      return ;
    }
    this.showLoader = true;
    const value = {...this.form.value, alumno: this.alumno};
    this.dialogService.confirm(AppMessages.confirm(ENTIDADES.RUTINA, GUARDAR, false, false)).then(
      ok => {
        const action$ = this.editar ? this.rutinaService.editarRutina(value) : this.rutinaService.guardarRutina(value);
        action$
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            _ => this.successGuardar(),
            response => this.handleError(response)
          );
    },
      cancelar => {}
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  private successFetchData(data): void {
    if (data.rutina) {
      this.form = RutinaFormBuilder.buildForm(data.rutina);
      this.itemsDias = this.dias.controls.map((_, i) => ({id: i, nombre: `Día ${i + 1}`}));
    }
    this.alumno = data.alumno;
    this.showLoader = false;
    this.showContent = true;
  }

  private successGuardar(): void {
    this.showLoader = false;
    this.dialogService.success(AppMessages.success(ENTIDADES.RUTINA, GUARDAR, false, false))
      .then(ok => {
        if (!this.editar) {
          this.router.navigate([`alumnos/${this.alumno}/rutina`]);
        }
      });
  }

  private handleError(response): void {
    this.showLoader = false;
    this.dialogService.error(AppMessages.error(response));
  }

}
