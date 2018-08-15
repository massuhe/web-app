import { Component, OnInit, ViewEncapsulation, HostBinding, Input } from '@angular/core';
import { Novedad } from '../../../novedades/_models/Novedad';

@Component({
  selector: 'app-noticia-card',
  templateUrl: './noticia-card.component.html',
  styleUrls: ['./noticia-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NoticiaCardComponent implements OnInit {

  @Input() novedad: Novedad;
  @Input() destacar: boolean;
  @HostBinding('class') classes = 'mb-4 col-12 col-md-6';

  constructor() { }

  ngOnInit() {
    this.setClasses();
  }

  private setClasses(): void {
    if (this.novedad && this.destacar) {
      return ;
    }
    this.classes += ' col-lg-4';
  }

}
