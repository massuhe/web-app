import { Component, OnInit, ViewEncapsulation, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-noticia-skeleton-card',
  templateUrl: './noticia-skeleton-card.component.html',
  styleUrls: ['./noticia-skeleton-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NoticiaSkeletonCardComponent implements OnInit {

  @Input() destacar: boolean;
  @HostBinding('class') classes = 'mb-4 col-12 col-md-6';

  constructor() { }

  ngOnInit() {
    this.setClasses();
  }

  private setClasses(): void {
    if (this.destacar) {
      return ;
    }
    this.classes += ' col-lg-4';
  }

}
