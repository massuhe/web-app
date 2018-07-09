import { Component, OnInit, ViewEncapsulation, Input, ViewChild, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Novedad } from '../_models/Novedad';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ImagesService } from '../../core/images.service';
import { ValidacionService } from '../../core/validacion.service';
import { DialogService } from '../../core/dialog.service';
import AppMessages from '../../_utils/AppMessages';
import { ENTIDADES, GUARDAR, ACTUALIZAR } from '../../app-constants';
import { NovedadService } from '../_services/novedad.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-agregar-novedad',
  templateUrl: './agregar-novedad.component.html',
  styleUrls: ['./agregar-novedad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarNovedadComponent implements OnInit, OnDestroy {

  @ViewChild(ModalComponent) modal;
  @ViewChild('fileInput') fileInput: ElementRef;
  @Input() novedad: Novedad;
  @Input() set show(value: boolean) {
    if (!value) {
      this.modal.hide();
      return;
    }
    this.modal.show();
  }
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onAddNovedad = new EventEmitter<Novedad>();
  form: FormGroup;
  showLoader: boolean;
  private image: string;
  private destroy$ = new EventEmitter<boolean>();

  constructor(
    private builder: FormBuilder,
    private imagesService: ImagesService,
    private validationService: ValidacionService,
    private dialogService: DialogService,
    private novedadService: NovedadService
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      titulo: ['', Validators.required],
      contenido: ['', [Validators.required]],
      esPrioritaria: [false, [Validators.required]]
    });
    this.image = '';
  }

  handleVisibilityChange(isVisible: boolean): void {
    if (!isVisible) {
      this.form.reset({esPrioritaria: false});
      this.image = '';
      this.fileInput.nativeElement.value = '';
      return;
    }
    if (this.novedad) {
      this.form.patchValue({...this.novedad});
    }
  }

  handleImageChange(event): void {
    this.imagesService.blobToString(event.target.files[0]).then(url => {
      this.image = url;
    });
  }

  handleGuardar(): void {
    if (!this.form.valid) {
      this.validationService.recursiveMarkAsDirty(this.form);
      return ;
    }
    const accion = this.novedad ? ACTUALIZAR : GUARDAR;
    this.dialogService.confirm(AppMessages.confirm(ENTIDADES.NOVEDAD, accion, false, false)).then(
      ok => {
        const formValue = {...this.form.value, image: this.image};
        this.showLoader = true;
        this.novedad ? this.editarNovedad(formValue) : this.guardarNovedad(formValue);
      },
      cancel => {}
    );
  }

  close(): void {
    this.modal.hide();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private guardarNovedad(novedadData: any): void {
    this.novedadService.guardarNovedad(novedadData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        newNovedad => this.successGuardarNovedad(newNovedad),
        error => this.handleError(error)
      );
  }

  private editarNovedad(novedadData: any): void {
    this.novedadService.editarNovedad(this.novedad.id, novedadData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        newNovedad => this.successEditarNovedad(newNovedad),
        error => this.handleError(error)
      );
  }

  private successGuardarNovedad(novedad: Novedad): void {
    this.showLoader = false;
    this.dialogService.success(AppMessages.success(ENTIDADES.NOVEDAD, GUARDAR, false, false));
    novedad.image = this.image;
    this.onAddNovedad.emit(novedad);
  }

  private successEditarNovedad(novedad: Novedad): void {
    this.showLoader = false;
    this.dialogService.success(AppMessages.success(ENTIDADES.NOVEDAD, ACTUALIZAR, false, false));
    novedad.image = this.image ? this.image : this.novedad.image;
    this.onAddNovedad.emit(novedad);
  }

  private handleError(error): void {
    this.showLoader = false;
    this.dialogService.error(AppMessages.error(error));
  }

}
