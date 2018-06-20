import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { switchMap } from 'rxjs/operators';
import { RutinaService } from '../_services/rutina.service';
import { ClasesService } from '../../clases/services/clases.service';
import { Clase } from '../../clases/models/clase';
import { DialogService } from '../../core/dialog.service';
import { GENERIC_ERROR_MESSAGE, GUARDAR } from '../../app-constants';
import { Rutina } from '../_models/rutina';
import { Dia } from '../_models/Dia';
import { ValidacionService } from '../../core/validacion.service';
import AppMessages from '../../_utils/AppMessages';

const ENTIDAD = 'Los detalles';

@Component({
  selector: 'app-cargar-detalles-rutina',
  templateUrl: './cargar-detalles-rutina.component.html',
  styleUrls: ['./cargar-detalles-rutina.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CargarDetallesRutinaComponent implements OnInit {

  form: FormGroup;
  clases: Clase[];
  showContent: boolean;
  showLoader: boolean;
  dia: Dia;
  detallesGroups: any;
  semanas: number[];
  alumno: number;
  error: boolean;

  constructor(
    private dialogService: DialogService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private rutinaService: RutinaService,
    private clasesService: ClasesService,
    private validacionService: ValidacionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.showLoader = true;
    this.fetchData()
      .subscribe(
        response => this.successFetchData(response),
        error => this.handleError(error)
      );
  }

  handleGuardar(): void {
    if (!this.form.valid) {
      this.validacionService.recursiveMarkAsDirty(this.form);
      return ;
    }
    this.dialogService.confirm(AppMessages.confirm(ENTIDAD, GUARDAR, true)).then(
      aceptar => {
        this.showLoader = true;
        const formValue = this.form.value;
        const clase = this.clases.find(c => c.id === Number(formValue.clase));
        this.rutinaService.guardarDetalles(formValue, this.alumno, clase)
        .subscribe(
          ok => {
            this.showLoader = false;
            this.dialogService.success(AppMessages.success(ENTIDAD, GUARDAR, true)).then(_ =>
              this.router.navigate(this.alumno ? [`alumnos/${this.alumno}/rutina`] : ['rutina'])
            );
          },
          error => this.handleError(error)
        );
      },
      cancelar => {}
    );
  }

  private fetchData(): Observable<any> {
    return this.route.params
      .pipe(
        switchMap(
          params => combineLatest(
            this.rutinaService.getRutina(params['idAlumno'] ? +params['idAlumno'] : undefined, {withUltimaSemana: true}),
            this.clasesService.getClasesAsistidas(Number(params['idAlumno']))
          ),
          (params, [rutina, clases]) => ({params, rutina, clases})
        )
      );
  }

  private successFetchData(data): void {
    const numeroDia = Number(data.params['numeroDia']) - 1;
    this.alumno = Number(data.params.idAlumno);
    this.clases = data.clases;
    this.dia = data.rutina.rutina.dias[numeroDia];
    this.semanas = Array(data.rutina.rutina.totalSemanas).fill(0).map((_, i) => i + 1);
    this.form = this.builder.group({
      dia: [numeroDia],
      clase: [, [Validators.required]],
      semana: [Number(data.rutina.ultimaSemana)],
      detalles: this.buildDetalles(Number(data.rutina.ultimaSemana))
    });
    this.form.get('semana').valueChanges.subscribe(
      semana => this.handleSemanaChange(Number(semana))
    );
    this.showLoader = false;
    this.showContent = true;
  }

  private handleError(response): void {
    this.showLoader = false;
    const error = response.error ? response.error.clientMessage : GENERIC_ERROR_MESSAGE;
    this.dialogService.error(error);
  }

  private buildDetalles(semana: number): FormArray {
    if (!this.dia) {
      this.error = true;
      return ;
    }
    const parametrosGrouped = this.dia.series
      .map(s => s.items
        .map(i => ({...i.parametrosSemana[semana - 1], ejercicioNombre: i.ejercicio.nombre, serieId: s.id}))
      )
      .reduce((pv, cv) => this.groupParametros(pv, cv), {});
    this.detallesGroups = Object.keys(parametrosGrouped).map(pgKey => parametrosGrouped[pgKey]);
    const parametrosArray = Object.keys(parametrosGrouped).reduce((prev, key) => [...prev, ...parametrosGrouped[key]], []);
    return this.builder.array(parametrosArray);
  }

  private groupParametros(finalObj, current): any {
    current.forEach(c => {
      if (!finalObj[c.serieId]) {
        finalObj[c.serieId] = [];
      }
      const parametro = this.builder.group({
        parametroSemana: c.id,
        repeticiones: c.repeticiones,
        ejercicioNombre: c.ejercicioNombre,
        carga: ['']
      });
      finalObj[c.serieId] = [...finalObj[c.serieId], parametro];
    });
    return finalObj;
  }

  private handleSemanaChange(semana: number): any {
    const detallesArray = (<FormArray>this.form.get('detalles')).controls;
    const parametrosSemana = this.dia.series.map(s =>
      s.items.map(i => i.parametrosSemana.filter(ps => ps.semana === semana)).reduce((pv, cv) => [...pv, ...cv])
    ).reduce((pv, cv) => [...pv, ...cv]);
    detallesArray.forEach((da, index) => {
      const parametroSemana = parametrosSemana[index];
      da.patchValue({parametroSemana: parametroSemana.id, repeticiones: parametroSemana.repeticiones});
    });
  }

}
