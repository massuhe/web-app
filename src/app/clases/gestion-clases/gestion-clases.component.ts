import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { Clase } from '../models/clase';
import { ClasesService } from '../services/clases.service';
import { IAsistente } from '../interfaces/IAsistente';
import { DialogService } from '../../core/dialog.service';
import { finalize, takeUntil } from 'rxjs/operators';
import AppMessages from '../../_utils/AppMessages';
import { ENTIDADES, GUARDAR } from '../../app-constants';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-gestion-clases',
  templateUrl: './gestion-clases.component.html',
  styleUrls: ['./gestion-clases.component.scss']
})
export class GestionClasesComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal;
  @Input() idClase: number;
  @Input() fecha: Date;
  @Input() hora: string;
  @Input() alumnosMax: number;
  @Output() onGuardarStart = new EventEmitter<boolean>();

  clase: Clase;
  showLoader: boolean;
  destroy$ = new Subject<boolean>();

  constructor(
    private clasesService: ClasesService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.clase = new Clase();
  }

  handleVisibilityChange(isVisible: boolean): void {
    if (isVisible) {
      this.handleShow();
    } else {
      this.handleClose();
    }
  }

  removeItem(asistenteId: number): void {
    const removeIndex = this.clase.asistencias.findIndex(
      a => a.id === asistenteId
    );
    this.clase = <Clase>{
      ...this.clase,
      asistencias: [
        ...this.clase.asistencias.slice(0, removeIndex),
        ...this.clase.asistencias.slice(removeIndex + 1)
      ]
    };
  }

  handleSuspenderClase(suspendida: boolean): void {
    this.clase = { ...this.clase, suspendida: suspendida } as Clase;
  }

  handleChangeMotivo(motivo: string): void {
    this.clase = { ...this.clase, motivo: motivo } as Clase;
  }

  handleChangeAsistencia(idAsistente: number): void {
    const asistencias = this.clase.asistencias.map(
      a => (a.id === idAsistente ? { ...a, asistio: !a.asistio } : a)
    );
    this.clase = { ...this.clase, asistencias: asistencias } as Clase;
  }

  addAsistente(asistente: IAsistente): void {
    const existeAsistente =
      this.clase.asistencias.findIndex(
        (a: IAsistente) => a.id === asistente.id
      ) > -1;
    if (!existeAsistente) {
      this.clase = {
        ...this.clase,
        asistencias: [...this.clase.asistencias, asistente]
      } as Clase;
    }
  }

  handleGuardar() {
    this.dialogService
      .confirm(AppMessages.confirm(ENTIDADES.CLASE, GUARDAR, true, false))
      .then(
        ok => {
          this.onGuardarStart.emit(true);
          this.clasesService
            .guardarClase(this.clase)
            .pipe(
              finalize(() => this.onGuardarStart.emit(false)),
              takeUntil(this.destroy$)
            )
            .subscribe(
              () => this.successGuardar(),
              err => this.handleError(err)
            );
        },
        cancelar => {}
      );
  }

  close(): void {
    this.modal.hide();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /** Acciones al abrir el modal */
  private handleShow() {
    setTimeout(() => this.getClase());
  }

  /** Acciones antes de cerrar el modal */
  private handleClose() {
    this.destroy$.next(true);
    this.clase = new Clase();
  }

  private getClase() {
    this.showLoader = true;
    this.clasesService
      .getDetalleClases(this.idClase)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (clase: Clase) => this.successGetClase(clase),
        err => this.handleError(err)
      );
  }

  private successGetClase(clase: Clase) {
    this.clase = clase;
    this.showLoader = false;
  }

  private successGuardar() {
    this.dialogService.success(AppMessages.success(ENTIDADES.CLASE, GUARDAR, true, false));
  }

  private handleError(error) {
    this.showLoader = false;
    this.dialogService.error(AppMessages.error(error));
  }
}
