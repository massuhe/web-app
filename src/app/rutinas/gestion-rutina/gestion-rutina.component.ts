import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { RutinaService } from '../_services/rutina.service';
import { Rutina } from '../_models/rutina';
import { finalize, withLatestFrom, takeUntil, switchMap, mergeMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { GENERIC_ERROR_MESSAGE } from '../../app-constants';
import { DialogService } from '../../core/dialog.service';
import { Observable } from 'rxjs/Observable';
import { IGetRutina } from '../_interfaces/IGetRutina';
import { Clase } from '../../clases/models/clase';
import AppMessages from '../../_utils/AppMessages';

@Component({
  selector: 'app-gestion-rutina',
  templateUrl: './gestion-rutina.component.html',
  styleUrls: ['./gestion-rutina.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionRutinaComponent implements OnInit, OnDestroy {
  rutina: Rutina;
  semanaActive: number;
  diasTabs = [];
  diaActive = 0;
  numeroRutinaActive: number;
  maxNumeroRutina: number;
  showContent: boolean;
  showLoader: boolean;
  idAlumno: number;
  nombreAlumno: string;
  clases: Clase[] = [];
  private destroy$ = new Subject<boolean>();

  constructor(
    private rutinaService: RutinaService,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(
          parameters => this.fetchRutina(parameters['idAlumno'] ? +parameters['idAlumno'] : undefined),
          (parameters, result) => ({parameters, result})
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(
        response => this.handleSuccessFetchData(response),
        error => this.onError(error)
      );
  }

  handleChangeDia(value: number): void {
    this.diaActive = value;
  }

  handleSemanaActiveChange(amount: number): void {
    this.semanaActive = this.semanaActive + amount;
  }

  handleNumeroRutinaChange(amount: number): void {
    this.numeroRutinaActive = this.numeroRutinaActive + amount;
    this.diaActive = 0;
    const numeroRutina = this.numeroRutinaActive === this.maxNumeroRutina ? undefined : this.numeroRutinaActive;
    this.fetchRutina(this.idAlumno, numeroRutina)
    .subscribe(
      response => this.successFetchRutina(response),
      error => this.onError(error)
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  private fetchRutina(idAlumno, numeroRutina?): Observable<IGetRutina> {
    this.showLoader = true;
    return this.rutinaService
      .getRutina(idAlumno, {withUltimaSemana: true, numeroRutina});
  }

  private handleSuccessFetchData(response): void {
    this.showContent = true;
    this.showLoader = false;
    if (!response.result.rutina) {
      return ;
    }
    this.initValues(response);
    this.successFetchRutina(response.result);
  }

  private initValues({parameters, result}): void {
    this.idAlumno = Number(parameters.idAlumno);
    this.semanaActive = result.ultimaSemana;
    this.maxNumeroRutina = this.numeroRutinaActive = result.rutina.numero;
  }

  private successFetchRutina(response: IGetRutina): void {
    this.semanaActive = response.ultimaSemana;
    this.showLoader = false;
    if (!response.rutina) {
      return ;
    }
    this.rutina = response.rutina;
    this.clases = response.clases;
    if (!this.nombreAlumno) {
      this.nombreAlumno = response.alumno;
    }
    if (this.rutina.dias.length) {
      this.diasTabs = this.rutina.dias.map((d, i) => ({
        nombre: `Día ${i + 1}`,
        id: i
      }));
      this.diaActive = this.diasTabs[0].id;
    }
  }

  private onError(res) {
    this.showLoader = false;
    this.dialogService.error(AppMessages.error(res));
  }
}
