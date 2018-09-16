import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NovedadService } from '../../novedades/_services/novedad.service';
import { Novedad } from '../../novedades/_models/Novedad';
import { switchMap, mergeMap, share } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { ImagesService } from '../../core/images.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.component.html',
  styleUrls: ['./listado-noticias.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoNoticiasComponent implements OnInit {

  novedadesDestacadas: Novedad[];
  novedades: Novedad[];
  novedadesDisplay: Novedad[];
  totalNovedades: number;
  novedadesPerPage: number;
  novedadesPerFetch: number;
  _currentPage: number;

  set currentPage(currentPage: number) {
    this._currentPage = currentPage;
    const init = currentPage * this.novedadesPerPage;
    const end = init + this.novedadesPerPage;
    this.novedadesDisplay = this.novedades.slice(init, end);
  }

  constructor(
    private novedadesService: NovedadService,
    private imageService: ImagesService
  ) { }

  ngOnInit() {
    this.novedadesDisplay = [];
    this.novedadesPerPage = 3;
    this.novedadesPerFetch = 10;
    this.fetchNovedades(this.novedadesPerFetch, 0);
  }

  handlePageChange(amount: number): void {
    this.currentPage = this._currentPage + amount;
    const nextPage = this._currentPage + 1;
    const novedadIndexToFetch = 2 + this.novedadesPerPage * nextPage;
    if (!this.shouldFetchNextNovedades(novedadIndexToFetch)) {
      return ;
    }
    this.fetchNovedades(this.novedadesPerFetch, nextPage, false);
  }

  private shouldFetchNextNovedades(novedadIndexToFetch: number): boolean {
    const novedadWasntFetched = ![...this.novedadesDestacadas, ...this.novedades][novedadIndexToFetch];
    const thereIsMoreNovedades = novedadIndexToFetch <= this.totalNovedades;
    return thereIsMoreNovedades && novedadWasntFetched;
  }

  private fetchNovedades(limit: number, page: number, first = true): void {
    const sortFields = [
      {key: 'es_prioritaria', direction: 'DESC'},
      {key: 'created_at', direction: 'DESC'}
    ];
    const getNovedades$ = this.novedadesService
      .getNovedades({sort: sortFields, limit, page}, {totalCount: true})
      .pipe(share());
    getNovedades$.subscribe(
      (response: any) => this.successFetchNovedades(response, first),
      error => this.handleError(error)
    );
    this.fetchNovedadesImage(getNovedades$);
  }

  private successFetchNovedades(response, first: boolean): void {
    const novedades = response.data;
    if (!first) {
      this.novedades = [...this.novedades, ...novedades];
      return ;
    }
    this.totalNovedades = response.count;
    this.novedadesDestacadas = novedades.slice(0, 2);
    this.novedades = novedades.slice(2);
    this.currentPage = 0;
  }

  private fetchNovedadesImage(getNovedades$: Observable<Novedad[]>): void {
    getNovedades$.pipe(
      switchMap((response: any) => from(response.data)),
      mergeMap(
        (novedad: Novedad) => this.imageService.getNovedadImage(novedad.imagePath),
        (novedad, image) => ({novedad, image})
      )
    ).subscribe(data => this.successFetchNovedadesImage(data));
  }

  private successFetchNovedadesImage(data): void {
    const novedad = [...this.novedadesDestacadas, ...this.novedades].find(n => n.id === data.novedad.id);
    this.imageService.blobToString(data.image).then(imageStr => novedad.image = imageStr);
  }

  private handleError(error) {
    console.log(error);
    this.novedades = [];
    this.novedadesDestacadas = [];
  }

}
