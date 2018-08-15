import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NovedadService } from '../../novedades/_services/novedad.service';
import { Novedad } from '../../novedades/_models/Novedad';
import { switchMap, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { ImagesService } from '../../core/images.service';
import { Observable } from 'rxjs/Observable';
import { compareByPrioridad } from '../_utils/compareFunctions';

@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.component.html',
  styleUrls: ['./listado-noticias.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoNoticiasComponent implements OnInit {

  novedadesDestacadas: Novedad[];
  novedades: Novedad[];

  constructor(
    private novedadesService: NovedadService,
    private imageService: ImagesService
  ) { }

  ngOnInit() {
    this.fetchNovedades();
  }

  private fetchNovedades(): void {
    const sortFields = [
      {key: 'es_prioritaria', direction: 'DESC'},
      {key: 'created_at', direction: 'DESC'}
    ];
    const getNovedades$ = this.novedadesService.getNovedades({sort: sortFields});
    getNovedades$.subscribe(
      (novedades: Novedad[]) => this.successFetchNovedades(novedades),
      error => this.handleError(error)
    );
    this.fetchNovedadesImage(getNovedades$);
  }

  private fetchNovedadesImage(getNovedades$: Observable<Novedad[]>): void {
    getNovedades$.pipe(
      switchMap((novedades: Novedad[]) => from(novedades)),
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

  private successFetchNovedades(novedades: Novedad[]): void {
    this.novedadesDestacadas = novedades.slice(0, 2);
    this.novedades = novedades.slice(2).sort(compareByPrioridad);
  }

  private handleError(error) {
    console.log(error);
    this.novedades = [];
    this.novedadesDestacadas = [];
  }

}
