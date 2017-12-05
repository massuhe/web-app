import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { Clase } from '../models/clase';
import { ClasesService } from '../services/clases.service';
import { Asistente } from '../interfaces/asistente';
import { DialogService } from '../../core/dialog.service';
import { finalize } from 'rxjs/operators/finalize';

@Component({
  selector: 'app-gestion-clases',
  templateUrl: './gestion-clases.component.html',
  styleUrls: ['./gestion-clases.component.scss']
})
export class GestionClasesComponent implements OnInit {
  @ViewChild('modal') modal;
  @Input() idClase: number;
  @Input() fecha: Date;
  @Input() hora: string;
  @Input() alumnosMax: number;
  @Output() onGuardarStart = new EventEmitter<boolean>();

  clase: Clase;
  showLoader: boolean;

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

  addAsistente(asistente: Asistente) {
    const existeAsistente =
      this.clase.asistencias.findIndex(
        (a: Asistente) => a.id === asistente.id
      ) > -1;
    if (!existeAsistente) {
      this.clase = {
        ...this.clase,
        asistencias: [...this.clase.asistencias, asistente]
      } as Clase;
    }
  }

  handleGuardar() {
    this.dialogService.confirm('¿Desea confimar los cambios?').then(() => {
      this.onGuardarStart.emit(true);
      this.clasesService
        .guardarClase(this.clase)
        .pipe(
          finalize(() => { this.onGuardarStart.emit(false); })
        )
        .subscribe(
          () => {this.dialogService.success('La clase se ha actualizado correctamente'); },
          () => { this.dialogService.error('Se ha producido un error inesperado'); }
        );
    });
  }

  close(): void {
    this.modal.hide();
  }

  /** Acciones al abrir el modal */
  private handleShow() {
    setTimeout(() => this.getClase());
  }

  /** Acciones antes de cerrar el modal */
  private handleClose() {
    this.clase = new Clase();
  }

  private getClase() {
    this.showLoader = true;
    this.clasesService.getDetalleClases(this.idClase).subscribe(
      (clase: Clase) => {
        this.clase = clase;
        this.showLoader = false;
      },
      err => {
        this.showLoader = false;
        this.dialogService.error('Se ha producido un error inesperado');
      }
    );
  }
}
