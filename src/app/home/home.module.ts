import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ListadoNoticiasComponent } from './listado-noticias/listado-noticias.component';
import { NoticiaCardComponent } from './listado-noticias/noticia-card/noticia-card.component';
import { NoticiaSkeletonCardComponent } from './listado-noticias/noticia-skeleton-card/noticia-skeleton-card.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [HomeComponent, ListadoNoticiasComponent, NoticiaCardComponent, NoticiaSkeletonCardComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
