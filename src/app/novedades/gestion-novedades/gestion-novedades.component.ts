import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DialogService } from '../../core/dialog.service';
import { ImagesService } from '../../core/images.service';
import { NovedadService } from '../_services/novedad.service';
import { Novedad } from '../_models/Novedad';
import AppMessages from '../../_utils/AppMessages';
import { ENTIDADES, ELIMINAR } from '../../app-constants';
import { from } from 'rxjs/observable/from';
import { mergeMap, switchMap, takeUntil, share } from 'rxjs/operators';
import { TruncatePipe } from '../../shared/truncate/truncate.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion-novedades',
  templateUrl: './gestion-novedades.component.html',
  styleUrls: ['./gestion-novedades.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionNovedadesComponent implements OnInit, OnDestroy {

  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
  @ViewChild('indexTmpl') indexTmpl: TemplateRef<any>;
  @ViewChild('imageTmpl') imageTmpl: TemplateRef<any>;
  @ViewChild('importantTmpl') importantTmpl: TemplateRef<any>;

  rows;
  columns;
  showLoader: boolean;
  showScreenLoader: boolean;
  showAddNovedad: boolean;
  novedadSelected: Novedad;
  novedades: Novedad[];
  imagePlaceholder = '../../../assets/images/placeholder-ratio-2-1.png';
  private destroy$ = new Subject<boolean>();

  constructor(
    private novedadService: NovedadService,
    private dialogService: DialogService,
    private imagesService: ImagesService
  ) { }

  ngOnInit() {
    this.novedades = [];
    this.initTable();
    this.fetchData();
  }

  editarItem(novedad: Novedad): void {
    this.novedadSelected = novedad;
    this.showAddNovedad = true;
  }

  handleAddNovedad(novedad: Novedad): void {
    const novedadEditIndex = this.novedades.findIndex(i => i.id === novedad.id);
    if (novedadEditIndex !== -1) {
      this.novedades = [
        ...this.novedades.slice(0, novedadEditIndex),
        novedad,
        ...this.novedades.slice(novedadEditIndex + 1)
      ];
    } else {
      this.novedades = [...this.novedades, novedad];
    }
    this.showAddNovedad = false;
    this.fillRows();
  }

  borrarNovedad(novedadId: number): void {
    this.dialogService.confirm(AppMessages.confirm(ENTIDADES.NOVEDAD, ELIMINAR, true, false)).then(
      ok => {
        this.showScreenLoader = true;
        this.novedadService.eliminarNovedad(novedadId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            _ => this.successBorrarNovedad(novedadId),
            error => this.handleErrors(error)
          );
      },
      cancelar => {});
  }

  filterData(value: any): void {
    const filterText = value.toUpperCase();
    this.rows = this.novedades.filter(
      r => r.contenido.toUpperCase().includes(filterText) || r.titulo.toUpperCase().includes(filterText)
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  agregarNovedad(): void {
    this.novedadSelected = undefined;
    this.showAddNovedad = true;
  }

  closeModal(): void {
    this.showAddNovedad = false;
  }

  editarNovedad(novedad: Novedad): void {
    this.novedadSelected = novedad;
    this.showAddNovedad = true;
  }

  private initTable(): void {
    this.rows = [];
    this.columns = [
      { name: '#', width: 25, cellTemplate: this.indexTmpl },
      { name: '', prop: 'esPrioritaria', width: 25, cellTemplate: this.importantTmpl },
      { name: 'T&iacute;tulo', prop: 'titulo' },
      { name: 'Contenido', prop: 'contenido', pipe: new TruncatePipe(), width: 300 },
      { name: 'Im&aacute;gen', cellTemplate: this.imageTmpl },
      { name: 'Acciones', cellTemplate: this.editTmpl, maxWidth: 160 }
    ];
  }

  private fetchData(): void {
    this.showLoader = true;
    const getNovedad$: Observable<Novedad[]> = this.novedadService.getNovedades()
      .pipe(
        share(),
        takeUntil(this.destroy$)
      );
    getNovedad$
      .subscribe(
        novedades => this.successGetNovedades(novedades),
        error => this.handleErrors(error)
      );
    getNovedad$
      .pipe(
        switchMap(novedades => from(novedades)),
        mergeMap(
          novedad => this.imagesService.getNovedadImage(novedad.imagePath),
          (novedad, img) => ({img, idItem: novedad.id})
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(
        image => this.successFetchData(image),
        res => this.handleErrors(res)
      );
  }

  private successGetNovedades(novedades: Novedad[]) {
    this.showLoader = false;
    this.novedades = novedades;
    this.fillRows();
  }

  private fillRows(): void {
    this.rows = this.novedades.slice();
  }

  private successFetchData(image): void {
    this.setImage(image);
  }

  private setImage(image): void {
    const reader = new FileReader();
    const {idItem, ...rest} = image;
    const novedad = this.novedades.find(i => i.id === idItem);
    if (rest.img) {
      this.imagesService.blobToString(rest.img).then(url => {
        novedad.image = url;
      });
    }
  }

  private successBorrarNovedad(novedadId: number) {
    this.dialogService.success(AppMessages.success(ENTIDADES.NOVEDAD, ELIMINAR, true, false));
    this.showScreenLoader = false;
    const novedadBorrarId = this.novedades.findIndex(i => i.id === novedadId);
    this.novedades = [...this.novedades.slice(0, novedadBorrarId), ...this.novedades.slice(novedadBorrarId + 1)];
    this.fillRows();
  }

  private handleErrors(res) {
    this.showLoader = false;
    this.showScreenLoader = false;
    this.dialogService.error(AppMessages.error(res));
  }

}
