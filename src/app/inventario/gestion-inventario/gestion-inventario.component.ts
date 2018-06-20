import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { ItemInventario } from '../_models/itemInventario';
import { InventarioService } from '../_services/inventario.service';
import { DialogService } from '../../core/dialog.service';
import { ELIMINAR, ENTIDADES } from '../../app-constants';
import { switchMap, mergeMap, takeUntil, share } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { ImagesService } from '../../core/images.service';
import AppMessages from '../../_utils/AppMessages';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-gestion-inventario',
  templateUrl: './gestion-inventario.component.html',
  styleUrls: ['./gestion-inventario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionInventarioComponent implements OnInit, OnDestroy {

  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
  @ViewChild('indexTmpl') indexTmpl: TemplateRef<any>;
  @ViewChild('imageTmpl') imageTmpl: TemplateRef<any>;
  @ViewChild('modalForm') modalForm;
  rows;
  columns;
  showLoader: boolean;
  showScreenLoader: boolean;
  item: ItemInventario;
  items: ItemInventario[];
  private destroy$ = new Subject<boolean>();

  constructor(
    private inventarioService: InventarioService,
    private dialogService: DialogService,
    private imagesService: ImagesService
  ) { }

  ngOnInit() {
    this.items = [];
    this.initTable();
    this.fetchData();
  }

  agregarItem(): void {
    this.item = new ItemInventario();
    setTimeout(_ => this.modalForm.modal.show());
  }

  editarItem(item: ItemInventario): void {
    this.item = item;
    setTimeout(_ => this.modalForm.modal.show());
  }

  handleAddItem(item: ItemInventario): void {
    const itemEditIndex = this.items.findIndex(i => i.id === item.id);
    if (itemEditIndex !== -1) {
      this.items = [
        ...this.items.slice(0, itemEditIndex),
        item,
        ...this.items.slice(itemEditIndex + 1)
      ];
    } else {
      this.items = [...this.items, item];
    }
    this.fillRows();
  }

  borrarItem(itemId: number): void {
    this.dialogService.confirm(AppMessages.confirm(ENTIDADES.ITEM, ELIMINAR))
    .then(
      ok => {
        this.showScreenLoader = true;
        this.inventarioService.eliminarInventario(itemId)
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe(
            _ => this.successBorrarItems(itemId),
            this.handleErrors.bind(this)
          );
      },
      cancelar => {});
  }

  filterData(value: any): void {
    const filterText = value.toUpperCase();
    this.rows = this.items.filter(
      r => r.descripcion.toUpperCase().includes(filterText)
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private initTable(): void {
    this.rows = [];
    this.columns = [
      { name: '#', width: 50, cellTemplate: this.indexTmpl },
      { name: 'Im&aacute;gen', cellTemplate: this.imageTmpl },
      { name: 'Descripci&oacute;n', prop: 'descripcion' },
      { prop: 'cantidad' },
      {
        name: 'Acciones',
        cellTemplate: this.editTmpl,
        maxWidth: 160
      }
    ];
  }

  private fetchData(): void {
    this.showLoader = true;
    const getInventario$ = this.inventarioService.getInventarios()
      .pipe(
        share(),
        takeUntil(this.destroy$)
      );
    getInventario$
      .subscribe(
        items => this.successGetItemsInventario(items),
        error => this.handleErrors(error)
      );
    getInventario$
      .pipe(
        switchMap(items => from(items)),
        mergeMap(
          item => this.imagesService.getInventarioImage(item.imagePath),
          (item, img) => ({img, idItem: item.id})
        )
      )
      .subscribe(
        image => this.successFetchData(image),
        res => this.handleErrors(res)
      );
  }

  private successGetItemsInventario(items: ItemInventario[]) {
    this.showLoader = false;
    this.items = items;
    this.fillRows();
  }

  private fillRows(): void {
    this.rows = this.items.slice();
  }

  private successFetchData(image): void {
    this.setImage(image);
  }

  private setImage(image): void {
    const reader = new FileReader();
    const {idItem, ...rest} = image;
    const item = this.items.find(i => i.id === idItem);
    if (rest.img) {
      this.imagesService.blobToString(rest.img).then(url => {
        item.image = url;
      });
    }
  }

  private successBorrarItems(itemId: number) {
    this.dialogService.success(AppMessages.success(ENTIDADES.ITEM, ELIMINAR));
    this.showScreenLoader = false;
    const itemBorrarId = this.items.findIndex(i => i.id === itemId);
    this.items = [...this.items.slice(0, itemBorrarId), ...this.items.slice(itemBorrarId + 1)];
    this.fillRows();
  }

  private handleErrors(res) {
    this.showLoader = false;
    this.showScreenLoader = false;
    this.dialogService.error(AppMessages.error(res));
  }


}
