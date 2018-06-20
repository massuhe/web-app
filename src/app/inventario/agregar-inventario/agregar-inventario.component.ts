import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  Input,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import {
  HOLDER_PATH,
  ESTRUCTURA_AGREGAR_INVENTARIO,
  MENSAJES_AGREGAR_INVENTARIO
} from '../_constants/agregar-inventario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidacionService } from '../../core/validacion.service';
import { DialogService } from '../../core/dialog.service';
import { InventarioService } from '../_services/inventario.service';
import AppMessages from '../../_utils/AppMessages';
import {
  ELIMINAR,
  GUARDAR,
  GENERIC_ERROR_MESSAGE,
  ENTIDADES
} from '../../app-constants';
import { finalize, takeUntil } from 'rxjs/operators';
import { ItemInventario } from '../_models/itemInventario';
import { ImagesService } from '../../core/images.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-agregar-inventario',
  templateUrl: './agregar-inventario.component.html',
  styleUrls: ['./agregar-inventario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarInventarioComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal;
  @ViewChild('fileInput') fileInput;
  @Input() item: ItemInventario;
  @Input()
  set image(value: string) {
    this.urlImage = this.urlImage === HOLDER_PATH ? value : this.urlImage;
  }
  @Output() onAddItem = new EventEmitter<ItemInventario>();
  form: FormGroup;
  errors: any;
  urlImage: string;
  showLoader: boolean;
  private destroy$ = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidacionService,
    private dialogService: DialogService,
    private inventarioService: InventarioService,
    private imagesService: ImagesService
  ) {}

  ngOnInit() {
    this.urlImage = HOLDER_PATH;
    this.form = this.formBuilder.group({
      descripcion: [
        '',
        { updateOn: 'blur', validators: [Validators.required] }
      ],
      cantidad: [0, { updateOn: 'blur', validators: [Validators.required] }]
    });
    this.initValidationService();
  }

  handleGuardar(): void {
    if (this.form.valid) {
      this.dialogService
        .confirm(AppMessages.confirm(ENTIDADES.ITEM, GUARDAR))
        .then(
          ok => {
            const value = this.getFormValue();
            this.showLoader = true;
            const $item = this.item.id
              ? this.inventarioService.editarInventario(this.item.id, value)
              : this.inventarioService.guardarInventario(value);
            $item
              .pipe(
                finalize(() => (this.showLoader = false)),
                takeUntil(this.destroy$)
              )
              .subscribe(
                this.onSuccess.bind(this),
                this.onError.bind(this)
              );
          },
          cancelar => {}
        );
    } else {
      this.validationService.showErrors(this.form);
    }
  }

  getFormValue(): any {
    const value = {
      ...this.form.value,
      image: this.urlImage === HOLDER_PATH || this.urlImage === this.item.image ?
        undefined
        : this.urlImage
    };
    return value;
  }

  close(): void {
    this.modal.hide();
  }

  handleVisibilityChange(isVisible: boolean): void {
    if (!isVisible) {
      this.form.reset({ cantidad: 0 });
      this.fileInput.nativeElement.value = '';
    } else {
      this.urlImage = this.item.image || HOLDER_PATH;
      this.populateForm();
    }
  }

  handleImageUpload(e): void {
    this.imagesService.blobToString(e.target.files[0]).then(url => {
      this.urlImage = url;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private populateForm(): void {
    if (this.item.id) {
      this.form.patchValue({
        descripcion: this.item.descripcion,
        cantidad: this.item.cantidad
      });
    }
  }

  private initValidationService(): void {
    this.validationService.inicializa(
      ESTRUCTURA_AGREGAR_INVENTARIO,
      MENSAJES_AGREGAR_INVENTARIO
    );
    this.validationService
      .getErrorsObservable(this.form)
      .pipe(takeUntil(this.destroy$))
      .subscribe(newErrors => {
        this.errors = newErrors;
      });
  }

  private onSuccess(i: ItemInventario): void {
    this.dialogService
      .success(AppMessages.success(ENTIDADES.ITEM, GUARDAR))
      .then(_ => {
        const item = i;
        item.setImage(this.urlImage);
        this.onAddItem.emit(item);
        this.modal.hide();
      });
  }

  private onError(res): void {
    this.dialogService.error(AppMessages.error(res));
  }
}
