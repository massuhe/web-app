import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { ItemInventario } from '../_models/itemInventario';
import { AgregarInventarioComponent } from '../agregar-inventario/agregar-inventario.component';
import { InventarioService } from '../_services/inventario.service';
import { DialogService } from '../../core/dialog.service';
import { GENERIC_ERROR_MESSAGE, ELIMINAR } from '../../app-constants';
import { concatMap, switchMap, concat, mergeMap, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { ImagesService } from '../../core/images.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HOLDER_PATH } from '../_constants/agregar-inventario';
import AppMessages from '../../_utils/AppMessages';

const ENTIDAD = 'El item';

@Component({
  selector: 'app-gestion-inventario',
  templateUrl: './gestion-inventario.component.html',
  styleUrls: ['./gestion-inventario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionInventarioComponent implements OnInit {

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
  private items: ItemInventario[];

  constructor(
    private inventarioService: InventarioService,
    private dialogService: DialogService,
    private imagesService: ImagesService,
    private sanitizer: DomSanitizer
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
    this.dialogService.confirm(AppMessages.confirm(ENTIDAD, ELIMINAR))
    .then(
      ok => {
        this.showScreenLoader = true;
        this.inventarioService.eliminarInventario(itemId)
          .subscribe(
            _ => {
              this.dialogService.success(AppMessages.success(ENTIDAD, ELIMINAR));
              this.showScreenLoader = false;
              const itemBorrarId = this.items.findIndex(i => i.id === itemId);
              this.items = [...this.items.slice(0, itemBorrarId), ...this.items.slice(itemBorrarId + 1)];
              this.fillRows();
            },
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
    this.inventarioService.getInventarios()
      .pipe(
        switchMap(
          items => from(items),
          (items, item) => ({items, item})
        ),
        mergeMap(
          ({items, item}) => this.imagesService.getInventarioImage(item.imagePath),
          ({items, item}, img, index) => ({image: {img, idItem: item.id}, items, index})
        )
      )
      .subscribe(
        ({image, items, index}) => {
          this.populateTable(items, index);
          this.setImage(image);
        },
        res => this.handleErrors(res),
        () => this.showLoader = false
      );
  }

  private populateTable(items: ItemInventario[], index: number) {
    if (index === 0) {
      this.showLoader = false;
      this.items = items;
      this.fillRows();
    }
  }

  private fillRows() {
    this.rows = this.items.slice();
  }

  private setImage(image) {
    const reader = new FileReader();
    const {idItem, ...rest} = image;
    const item = this.items.find(i => i.id === idItem);
    if (rest.img) {
      this.imagesService.blobToString(rest.img).then(url => {
        item.image = url;
      });
    }
  }

  private handleErrors(res) {
    this.showLoader = false;
    this.showScreenLoader = false;
    this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
  }


}
